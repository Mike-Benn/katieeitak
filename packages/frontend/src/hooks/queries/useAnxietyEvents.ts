import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { api } from '@/api/api';
import type { AnxietyEventCursor, GetAnxietyEventsResponse } from '@katieeitak/shared';

export function useAnxietyEvents() {
  return useInfiniteQuery<
    GetAnxietyEventsResponse,
    Error,
    InfiniteData<GetAnxietyEventsResponse, AnxietyEventCursor | null>,
    string[],
    AnxietyEventCursor | null
  >({
    queryKey: ['anxietyEvents', 'upcoming'],
    queryFn: ({ pageParam, signal }) => api.getAnxietyEventsById({ pageParam, signal }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    refetchOnWindowFocus: false,
  });
}
