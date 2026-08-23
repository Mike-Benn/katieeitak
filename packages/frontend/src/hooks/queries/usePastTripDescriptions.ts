import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import type { GetPastTripDescriptionsResponse, TripDescriptionsCursor } from '@katieeitak/shared';
import { api } from '@/api/api';

interface UsePastTripDescriptionsParams {
  enabled: boolean;
}

export function usePastTripDescriptions({ enabled }: UsePastTripDescriptionsParams) {
  return useInfiniteQuery<
    GetPastTripDescriptionsResponse,
    Error,
    InfiniteData<GetPastTripDescriptionsResponse, TripDescriptionsCursor | null>,
    string[],
    TripDescriptionsCursor | null
  >({
    queryKey: ['past-trip-descriptions'],
    queryFn: ({ pageParam, signal }) => api.getPastTripDescriptions({ pageParam, signal }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    refetchOnWindowFocus: false,
    enabled,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
