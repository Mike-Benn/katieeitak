import { useQueryClient, useMutation } from '@tanstack/react-query';
import { api } from '@/api/api';
import { toast } from 'sonner';

export function usePatchReadBookByIdMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.patchReadBookById,
    onSuccess: (updatedMarkedBook) => {
      queryClient.setQueryData(['readStatus', updatedMarkedBook.ol_book_key], updatedMarkedBook);
    },
    onError: () => {
      toast.error('There was an error updating the marked status, please try again.');
    },
  });
}
