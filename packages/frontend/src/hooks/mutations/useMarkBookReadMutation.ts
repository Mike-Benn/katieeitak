import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/api';
import { toast } from 'sonner';

export function useMarkBookReadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.markBookRead,
    onSuccess: (newMarkedBook, variables) => {
      queryClient.setQueryData(['readStatus', variables.ol_book_key], newMarkedBook);
    },
    onError: () => {
      toast.error('Something went wrong, please try again.');
    },
  });
}
