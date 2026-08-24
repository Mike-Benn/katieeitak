import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import type {
  GetPastPlateRaceDescriptionsResponse,
  PlateRaceDescriptionsCursor,
} from '@katieeitak/shared';
import { api } from '@/api/api';

interface UsePastPlateRaceDescriptionsParams {
  enabled: boolean;
}

export function usePastPlateRaceDescriptions({ enabled }: UsePastPlateRaceDescriptionsParams) {
  return useInfiniteQuery<
    GetPastPlateRaceDescriptionsResponse,
    Error,
    InfiniteData<GetPastPlateRaceDescriptionsResponse, PlateRaceDescriptionsCursor | null>,
    string[],
    PlateRaceDescriptionsCursor | null
  >({
    queryKey: ['past-plate-race-descriptions'],
    queryFn: ({ pageParam, signal }) => api.getPastPlateRaceDescriptions({ pageParam, signal }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    refetchOnWindowFocus: false,
    enabled,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
