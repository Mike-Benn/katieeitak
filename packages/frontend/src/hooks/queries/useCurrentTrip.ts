import { api } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

export function useCurrentTrip() {
  return useQuery({
    queryKey: ['current-trip'],
    queryFn: ({ signal }) => api.getCurrentTripByUserId({ signal }),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
