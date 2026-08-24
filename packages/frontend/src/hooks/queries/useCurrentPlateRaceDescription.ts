import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/api';

interface UseCurrentPlateRaceDescriptionParams {
  enabled: boolean;
}

export function useCurrentPlateRaceDescription({ enabled }: UseCurrentPlateRaceDescriptionParams) {
  return useQuery({
    queryKey: ['current-plate-race-description'],
    queryFn: ({ signal }) => api.getCurrentPlateRaceDescription({ signal }),
    refetchOnWindowFocus: false,
    enabled,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
