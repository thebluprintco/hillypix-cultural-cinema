-- Create enum for movie status
CREATE TYPE public.movie_status AS ENUM ('premiere', 'coming_soon', 'library');

-- Create movies table with manual status control
CREATE TABLE public.movies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  poster_url TEXT,
  trailer_url TEXT,
  duration_minutes INTEGER,
  genre TEXT[],
  rating TEXT,
  language TEXT,
  state TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  status movie_status NOT NULL DEFAULT 'library',
  premiere_start_at TIMESTAMP WITH TIME ZONE,
  premiere_end_at TIMESTAMP WITH TIME ZONE,
  release_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user purchases table
CREATE TABLE public.purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  movie_id UUID NOT NULL REFERENCES public.movies(id) ON DELETE CASCADE,
  purchased_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '30 days'),
  playback_started_at TIMESTAMP WITH TIME ZONE,
  playback_expires_at TIMESTAMP WITH TIME ZONE,
  max_devices INTEGER NOT NULL DEFAULT 2,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create device tracking table for anti-sharing
CREATE TABLE public.purchase_devices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  purchase_id UUID NOT NULL REFERENCES public.purchases(id) ON DELETE CASCADE,
  device_fingerprint TEXT NOT NULL,
  device_name TEXT,
  first_used_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_used_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(purchase_id, device_fingerprint)
);

-- Create profiles table for user info
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Movies: Public read access
CREATE POLICY "Movies are viewable by everyone" 
ON public.movies 
FOR SELECT 
USING (true);

-- Purchases: Users can only see their own purchases
CREATE POLICY "Users can view their own purchases" 
ON public.purchases 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own purchases" 
ON public.purchases 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own purchases" 
ON public.purchases 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Purchase devices: Users can manage devices for their purchases
CREATE POLICY "Users can view devices for their purchases" 
ON public.purchase_devices 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.purchases 
    WHERE purchases.id = purchase_devices.purchase_id 
    AND purchases.user_id = auth.uid()
  )
);

CREATE POLICY "Users can register devices for their purchases" 
ON public.purchase_devices 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.purchases 
    WHERE purchases.id = purchase_devices.purchase_id 
    AND purchases.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update devices for their purchases" 
ON public.purchase_devices 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.purchases 
    WHERE purchases.id = purchase_devices.purchase_id 
    AND purchases.user_id = auth.uid()
  )
);

-- Profiles: Users can view all profiles, update only their own
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to check device limit and register device
CREATE OR REPLACE FUNCTION public.register_playback_device(
  p_purchase_id UUID,
  p_device_fingerprint TEXT,
  p_device_name TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_purchase purchases%ROWTYPE;
  v_device_count INTEGER;
  v_existing_device purchase_devices%ROWTYPE;
BEGIN
  -- Get purchase details
  SELECT * INTO v_purchase FROM purchases WHERE id = p_purchase_id AND user_id = auth.uid();
  
  IF v_purchase.id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Purchase not found');
  END IF;
  
  -- Check if purchase is still valid
  IF NOT v_purchase.is_active OR v_purchase.expires_at < now() THEN
    RETURN json_build_object('success', false, 'error', 'Purchase has expired');
  END IF;
  
  -- Check if playback window has expired
  IF v_purchase.playback_expires_at IS NOT NULL AND v_purchase.playback_expires_at < now() THEN
    RETURN json_build_object('success', false, 'error', 'Playback window has expired');
  END IF;
  
  -- Check if device already registered
  SELECT * INTO v_existing_device 
  FROM purchase_devices 
  WHERE purchase_id = p_purchase_id AND device_fingerprint = p_device_fingerprint AND is_active = true;
  
  IF v_existing_device.id IS NOT NULL THEN
    -- Update last used time
    UPDATE purchase_devices SET last_used_at = now() WHERE id = v_existing_device.id;
    
    -- Start playback timer if not started
    IF v_purchase.playback_started_at IS NULL THEN
      UPDATE purchases 
      SET playback_started_at = now(), 
          playback_expires_at = now() + INTERVAL '48 hours'
      WHERE id = p_purchase_id;
    END IF;
    
    RETURN json_build_object('success', true, 'device_id', v_existing_device.id);
  END IF;
  
  -- Count active devices
  SELECT COUNT(*) INTO v_device_count 
  FROM purchase_devices 
  WHERE purchase_id = p_purchase_id AND is_active = true;
  
  IF v_device_count >= v_purchase.max_devices THEN
    RETURN json_build_object(
      'success', false, 
      'error', 'Device limit reached. Maximum ' || v_purchase.max_devices || ' devices allowed.',
      'device_count', v_device_count,
      'max_devices', v_purchase.max_devices
    );
  END IF;
  
  -- Register new device
  INSERT INTO purchase_devices (purchase_id, device_fingerprint, device_name)
  VALUES (p_purchase_id, p_device_fingerprint, p_device_name);
  
  -- Start playback timer if not started
  IF v_purchase.playback_started_at IS NULL THEN
    UPDATE purchases 
    SET playback_started_at = now(), 
        playback_expires_at = now() + INTERVAL '48 hours'
    WHERE id = p_purchase_id;
  END IF;
  
  RETURN json_build_object('success', true, 'message', 'Device registered successfully');
END;
$$;

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for timestamp updates
CREATE TRIGGER update_movies_updated_at
  BEFORE UPDATE ON public.movies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();