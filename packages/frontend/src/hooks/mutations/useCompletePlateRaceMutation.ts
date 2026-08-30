import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/api/api';
import { useNavigate } from '@tanstack/react-router';

interface UseCompletePlateRaceMutationParams {
  plateRaceId: string;
}

export function useCompletePlateRaceMutation({ plateRaceId }: UseCompletePlateRaceMutationParams) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: api.completePlateRace,
    onError: () => {
      toast.error('There was an error completing plate race, please try again.');
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.resetQueries({ queryKey: ['current-plate-race-description'] }),
        queryClient.resetQueries({ queryKey: ['past-plate-race-descriptions'] }),
        queryClient.resetQueries({ queryKey: ['plateRaceData', plateRaceId] }),
      ]);
      toast.success('Plate race completed successfully.');
      void navigate({
        to: '/america/plate-race',
        search: {
          view: 'current',
        },
      });
    },
  });
}
