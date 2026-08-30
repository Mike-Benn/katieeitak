import { useQueryClient, useMutation } from '@tanstack/react-query';
import { api } from '@/api/api';
import { toast } from 'sonner';
import type { GetStatesSeenResponse } from '@katieeitak/shared';

export function useUnmarkStateSeen() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.unmarkStateSeen,
    onError: () => {
      toast.error('There was an error unmarking state, please try again.');
    },
    onSuccess: async (data) => {
      queryClient.setQueryData<GetStatesSeenResponse>(['states-seen'], (old) => {
        if (!old) return old;
        return old.map((state) => {
          if (data.state_id === state.id) {
            return {
              ...state,
              state_date_seen: null,
            };
          } else {
            return state;
          }
        });
      });
    },
  });
}
