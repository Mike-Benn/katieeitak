import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/api';

interface UseBookProfileParams {
  bookKey: string;
}

export function useBookProfile({ bookKey }: UseBookProfileParams) {
  const bookProfileQuery = useQuery({
    queryKey: ['bookProfile', bookKey],
    queryFn: ({ signal }) => api.getBookByKey({ key: bookKey, signal }),
    refetchOnWindowFocus: false,
  });

  const markedBookProfileQuery = useQuery({
    queryKey: ['readStatus', bookKey],
    queryFn: ({ signal }) => api.getMarkedBook({ key: bookKey, signal }),
    refetchOnWindowFocus: false,
  });

  return {
    bookProfileQuery,
    markedBookProfileQuery,
  };
}
