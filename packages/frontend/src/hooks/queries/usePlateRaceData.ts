import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/api';

interface UsePlateRaceDataParams {
  plateRaceId: string;
}

export function usePlateRaceData({ plateRaceId }: UsePlateRaceDataParams) {
  return useQuery({
    queryKey: ['plateRaceData', plateRaceId],
    queryFn: ({ signal }) => api.getPlateRaceData({ plateRaceId, signal }),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
