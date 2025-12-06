import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type MovieStatus = 'premiere' | 'coming_soon' | 'library';

export interface Movie {
  id: string;
  title: string;
  description: string | null;
  poster_url: string | null;
  trailer_url: string | null;
  duration_minutes: number | null;
  genre: string[] | null;
  rating: string | null;
  language: string | null;
  state: string | null;
  price: number;
  status: MovieStatus;
  premiere_start_at: string | null;
  premiere_end_at: string | null;
  release_date: string | null;
  created_at: string;
  updated_at: string;
}

export const useMovies = (status?: MovieStatus) => {
  return useQuery({
    queryKey: ['movies', status],
    queryFn: async () => {
      let query = supabase.from('movies').select('*');
      
      if (status) {
        query = query.eq('status', status);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Movie[];
    },
  });
};

export const useMoviesByStatus = () => {
  return useQuery({
    queryKey: ['movies-by-status'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const movies = data as Movie[];
      
      return {
        premieres: movies.filter(m => m.status === 'premiere'),
        comingSoon: movies.filter(m => m.status === 'coming_soon'),
        library: movies.filter(m => m.status === 'library'),
      };
    },
  });
};

export const usePremieres = () => {
  return useMovies('premiere');
};

export const useComingSoon = () => {
  return useMovies('coming_soon');
};

export const useLibrary = () => {
  return useMovies('library');
};
