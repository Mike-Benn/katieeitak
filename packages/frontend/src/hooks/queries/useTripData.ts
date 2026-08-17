import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/api';

interface UseTripDataParams {
  tripId: string;
}

export function useTripData({ tripId }: UseTripDataParams) {
  return useQuery({
    queryKey: ['tripData', tripId],
    queryFn: ({ signal }) => api.getTripData({ tripId, signal }),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
