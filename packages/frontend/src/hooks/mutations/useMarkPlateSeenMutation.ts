import { api } from '@/api/api';
import { type GetCurrentTripByUserIdResponse } from '@katieeitak/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useMarkPlateSeenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.markPlateSeen,
    onError: () => {
      toast.error('There was an error marking plate, please try again.');
    },
    onSuccess: async (data) => {
      //await queryClient.resetQueries({ queryKey: ['current-trip'] });
      queryClient.setQueryData<GetCurrentTripByUserIdResponse>(['current-trip'], (old) => {
        if (!old) return old;
        return {
          ...old,
          plateList: old.plateList.map((plate) => {
            if (plate.id !== data.plate_id) return plate;
            return {
              ...plate,
              date_seen: data.date_seen,
            };
          }),
        };
      });
    },
  });
}
