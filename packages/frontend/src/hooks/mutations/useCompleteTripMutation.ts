import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/api/api';

export function useCompleteTripMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.completeTrip,
    onError: () => {
      toast.error('There was an error completing trip, please try again.');
    },
    onSuccess: async () => {
      await queryClient.resetQueries({ queryKey: ['current-trip-descriptions'] });
      await queryClient.resetQueries({ queryKey: ['past-trip-descriptions'] });
      await queryClient.resetQueries({ queryKey: ['current-trip-data'] });
      await queryClient.resetQueries({ queryKey: ['past-trip-data'] });
    },
  });
}
