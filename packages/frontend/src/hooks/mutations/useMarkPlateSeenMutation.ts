import { api } from '@/api/api';
import {
  type GetCurrentTripDescriptionResponse,
  type GetTripDataResponse,
} from '@katieeitak/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface UseMarkPlateSeenMutationParams {
  tripId: string;
}

export function useMarkPlateSeenMutation({ tripId }: UseMarkPlateSeenMutationParams) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.markPlateSeen,
    onError: () => {
      toast.error('There was an error marking plate, please try again.');
    },
    onSuccess: async (data) => {
      queryClient.setQueryData<GetTripDataResponse>(['tripData', tripId], (old) => {
        if (!old) return old;
        return {
          ...old,
          count: old.count + 1,
          plateList: old.plateList.map((plate) => {
            if (plate.id !== data.plate_id) return plate;
            return {
              ...plate,
              date_seen: data.date_seen,
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
            plates_seen_count: old.plates_seen_count + 1,
          };
        },
      );
    },
  });
}
