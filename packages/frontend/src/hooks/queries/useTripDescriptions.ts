import { api } from '@/api/api';
import type {
  GetTripDescriptionsResponse,
  TripDescriptionsCursor,
  TripStatus,
} from '@katieeitak/shared';
import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';

interface UseTripDescriptionsParams {
  status: TripStatus;
  enabled: boolean;
}

export function useTripDescriptions({ status, enabled }: UseTripDescriptionsParams) {
  return useInfiniteQuery<
    GetTripDescriptionsResponse,
    Error,
    InfiniteData<GetTripDescriptionsResponse, TripDescriptionsCursor | null>,
    string[],
    TripDescriptionsCursor | null
  >({
    queryKey: [`${status}-trip-descriptions`],
    queryFn: ({ pageParam, signal }) => api.getTripDescriptions({ pageParam, status, signal }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    refetchOnWindowFocus: false,
    enabled,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
