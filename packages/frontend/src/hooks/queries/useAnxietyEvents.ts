import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { api } from '@/api/api';
import type {
  AnxietyEventCursor,
  AnxietyEventStatus,
  AnxietyEventOccurrenceType,
  GetAnxietyEventsResponse,
} from '@katieeitak/shared';

interface UseAnxietyEventsParams {
  status: AnxietyEventStatus;
  enabled: boolean;
  occurrenceType: AnxietyEventOccurrenceType;
}

export function useAnxietyEvents({ status, enabled, occurrenceType }: UseAnxietyEventsParams) {
  return useInfiniteQuery<
    GetAnxietyEventsResponse,
    Error,
    InfiniteData<GetAnxietyEventsResponse, AnxietyEventCursor | null>,
    string[],
    AnxietyEventCursor | null
  >({
    queryKey: ['anxietyEvents', status],
    queryFn: ({ pageParam, signal }) =>
      api.getAnxietyEventsById({ pageParam, status, signal, occurrenceType }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    refetchOnWindowFocus: false,
    enabled,
    staleTime: 1000 * 60 * 10,
  });
}
