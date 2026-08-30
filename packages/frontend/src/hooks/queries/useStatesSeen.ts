import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/api';

export function useStatesSeen() {
  return useQuery({
    queryKey: ['states-seen'],
    queryFn: ({ signal }) => api.getStatesSeen({ signal }),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
