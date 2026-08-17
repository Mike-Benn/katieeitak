import { api } from '@/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateTripMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createTripByUserId,
    onError: () => {
      toast.error('There was an error creating new trip, please try again.');
    },
    onSuccess: async () => {
      await queryClient.resetQueries({ queryKey: ['current-trip-descriptions'] });
    },
  });
}
