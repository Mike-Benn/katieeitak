import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { api } from '@/api/api';
import type { GetAnxietyEventsResponse } from '@katieeitak/shared';

export function useAnxietyEvents() {
  return useInfiniteQuery<
    GetAnxietyEventsResponse,
    Error,
    InfiniteData<GetAnxietyEventsResponse, number>,
    string[],
    number
  >({
    queryKey: ['anxietyEvents'],
    queryFn: ({ pageParam, signal }) => api.getAnxietyEvents({ pageParam, signal }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + 5;
      if (nextOffset >= lastPage.num_found) {
        return undefined;
      }
      return nextOffset;
    },
    refetchOnWindowFocus: false,
  });
}
