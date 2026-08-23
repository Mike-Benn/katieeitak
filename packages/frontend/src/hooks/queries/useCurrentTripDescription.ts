import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/api';

interface UseCurrentTripDescriptionParams {
  enabled: boolean;
}

export function useCurrentTripDescription({ enabled }: UseCurrentTripDescriptionParams) {
  return useQuery({
    queryKey: ['current-trip-description'],
    queryFn: ({ signal }) => api.getCurrentTripDescription({ signal }),
    refetchOnWindowFocus: false,
    enabled,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
