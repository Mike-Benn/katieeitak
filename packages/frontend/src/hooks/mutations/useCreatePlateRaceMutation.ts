import { api } from '@/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreatePlateRaceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createPlateRaceByUserId,
    onError: () => {
      toast.error('There was an error creating new plate race, please try again.');
    },
    onSuccess: async () => {
      await queryClient.resetQueries({ queryKey: ['current-plate-race-description'] });
    },
  });
}
