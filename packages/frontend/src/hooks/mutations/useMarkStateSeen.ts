import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/api';
import { toast } from 'sonner';
import type { GetStatesSeenResponse } from '@katieeitak/shared';

export function useMarkStateSeenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.markStateSeen,
    onError: () => {
      toast.error('There was an error marking state, please try again.');
    },
    onSuccess: async (data) => {
      queryClient.setQueryData<GetStatesSeenResponse>(['states-seen'], (old) => {
        if (!old) return old;
        return old.map((state) => {
          if (data.state_id === state.id) {
            return {
              ...state,
              state_date_seen: data.date_seen,
            };
          } else {
            return state;
          }
        });
      });
    },
  });
}
