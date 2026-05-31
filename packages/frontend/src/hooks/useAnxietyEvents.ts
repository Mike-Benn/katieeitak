import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/api';

export function useAnxietyEvents() {
  return useQuery({
    queryKey: ['anxietyEvents'],
    queryFn: ({ signal }) => api.getAnxietyEvents(signal),
    staleTime: 10_000,
  });
}
