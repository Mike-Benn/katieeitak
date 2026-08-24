import { useQueryClient, useMutation } from '@tanstack/react-query';
import { api } from '@/api/api';
import { toast } from 'sonner';
import type {
  GetCurrentPlateRaceDescriptionResponse,
  GetPlateRaceDataResponse,
} from '@katieeitak/shared';

interface UseUnmarkPlateSeenMutationParams {
  plateRaceId: string;
}

export function useUnmarkPlateSeenMutation({ plateRaceId }: UseUnmarkPlateSeenMutationParams) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.unmarkPlateSeen,
    onError: () => {
      toast.error('There was an error unmarking plate, please try again.');
    },
    onSuccess: async (data) => {
      queryClient.setQueryData<GetPlateRaceDataResponse>(['plateRaceData', plateRaceId], (old) => {
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
      queryClient.setQueryData<GetCurrentPlateRaceDescriptionResponse>(
        ['current-plate-race-description'],
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
