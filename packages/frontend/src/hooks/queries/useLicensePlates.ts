import { api } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

export function useLicensePlates() {
  return useQuery({
    queryKey: ['license-plates'],
    queryFn: ({ signal }) => api.getLicensePlates({ signal }),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
