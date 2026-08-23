import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/api/api';
import { useNavigate } from '@tanstack/react-router';

interface UseCompleteTripMutation {
  tripId: string;
}

export function useCompleteTripMutation({ tripId }: UseCompleteTripMutation) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: api.completeTrip,
    onError: () => {
      toast.error('There was an error completing trip, please try again.');
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.resetQueries({ queryKey: ['current-trip-description'] }),
        queryClient.resetQueries({ queryKey: ['past-trip-descriptions'] }),
        queryClient.resetQueries({ queryKey: ['tripData', tripId] }),
      ]);
      toast.success('Trip completed successfully.');
      void navigate({
        to: '/license-plates',
        search: {
          view: 'current',
        },
      });
    },
  });
}
