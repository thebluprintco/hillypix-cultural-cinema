import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useDeviceFingerprint } from './useDeviceFingerprint';

export interface Purchase {
  id: string;
  user_id: string;
  movie_id: string;
  purchased_at: string;
  expires_at: string;
  playback_started_at: string | null;
  playback_expires_at: string | null;
  max_devices: number;
  is_active: boolean;
  created_at: string;
}

export interface PurchaseDevice {
  id: string;
  purchase_id: string;
  device_fingerprint: string;
  device_name: string | null;
  first_used_at: string;
  last_used_at: string;
  is_active: boolean;
}

export const useUserPurchases = () => {
  return useQuery({
    queryKey: ['user-purchases'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true);
      
      if (error) throw error;
      return data as Purchase[];
    },
  });
};

export const useMoviePurchase = (movieId: string) => {
  return useQuery({
    queryKey: ['movie-purchase', movieId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', user.id)
        .eq('movie_id', movieId)
        .eq('is_active', true)
        .maybeSingle();
      
      if (error) throw error;
      return data as Purchase | null;
    },
    enabled: !!movieId,
  });
};

export const usePurchaseDevices = (purchaseId: string) => {
  return useQuery({
    queryKey: ['purchase-devices', purchaseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('purchase_devices')
        .select('*')
        .eq('purchase_id', purchaseId)
        .eq('is_active', true);
      
      if (error) throw error;
      return data as PurchaseDevice[];
    },
    enabled: !!purchaseId,
  });
};

export const useCreatePurchase = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      movieId, 
      maxDevices = 2 
    }: { 
      movieId: string; 
      maxDevices?: number;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30); // 30 days to start watching
      
      const { data, error } = await supabase
        .from('purchases')
        .insert({
          user_id: user.id,
          movie_id: movieId,
          expires_at: expiresAt.toISOString(),
          max_devices: maxDevices,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as Purchase;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-purchases'] });
    },
  });
};

export const useRegisterDevice = () => {
  const { fingerprint, deviceName } = useDeviceFingerprint();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (purchaseId: string) => {
      if (!fingerprint) throw new Error('Device fingerprint not available');
      
      const { data, error } = await supabase.rpc('register_playback_device', {
        p_purchase_id: purchaseId,
        p_device_fingerprint: fingerprint,
        p_device_name: deviceName,
      });
      
      if (error) throw error;
      
      const result = data as { success: boolean; error?: string; device_count?: number; max_devices?: number };
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to register device');
      }
      
      return result;
    },
    onSuccess: (_, purchaseId) => {
      queryClient.invalidateQueries({ queryKey: ['purchase-devices', purchaseId] });
      queryClient.invalidateQueries({ queryKey: ['movie-purchase'] });
    },
  });
};

export const useRemoveDevice = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ purchaseId, deviceId }: { purchaseId: string; deviceId: string }) => {
      const { error } = await supabase
        .from('purchase_devices')
        .update({ is_active: false })
        .eq('id', deviceId);
      
      if (error) throw error;
    },
    onSuccess: (_, { purchaseId }) => {
      queryClient.invalidateQueries({ queryKey: ['purchase-devices', purchaseId] });
    },
  });
};
