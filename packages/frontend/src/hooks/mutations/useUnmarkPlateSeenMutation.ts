import { useQueryClient, useMutation } from '@tanstack/react-query';
import { api } from '@/api/api';
import { toast } from 'sonner';
import type { GetCurrentTripDescriptionResponse, GetTripDataResponse } from '@katieeitak/shared';

interface UseUnmarkPlateSeenMutationParams {
  tripId: string;
}

export function useUnmarkPlateSeenMutation({ tripId }: UseUnmarkPlateSeenMutationParams) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.unmarkPlateSeen,
    onError: () => {
      toast.error('There was an error unmarking plate, please try again.');
    },
    onSuccess: async (data) => {
      queryClient.setQueryData<GetTripDataResponse>(['tripData', tripId], (old) => {
        if (!old) return old;
        return {
          ...old,
          count: old.count - 1,
          plateList: old.plateList.map((plate) => {
            if (plate.id !== data.plate_id) return plate;
            return {
              ...plate,
              date_seen: null,
            };
          }),
        };
      });
      queryClient.setQueryData<GetCurrentTripDescriptionResponse>(
        ['current-trip-description'],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            plates_seen_count: old.plates_seen_count - 1,
          };
        },
      );
    },
  });
}
