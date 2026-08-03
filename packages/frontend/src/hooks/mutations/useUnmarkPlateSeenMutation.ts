import { useQueryClient, useMutation } from '@tanstack/react-query';
import { api } from '@/api/api';
import { toast } from 'sonner';
import type { GetCurrentTripByUserIdResponse } from '@katieeitak/shared';

export function useUnmarkPlateSeenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.unmarkPlateSeen,
    onError: () => {
      toast.error('There was an error unmarking plate, please try again.');
    },
    onSuccess: async (data) => {
      queryClient.setQueryData<GetCurrentTripByUserIdResponse>(['current-trip'], (old) => {
        if (!old) return old;
        return {
          ...old,
          plateList: old.plateList.map((plate) => {
            if (plate.id !== data.plate_id) return plate;
            return {
              ...plate,
              date_seen: null,
            };
          }),
        };
      });
    },
  });
}
