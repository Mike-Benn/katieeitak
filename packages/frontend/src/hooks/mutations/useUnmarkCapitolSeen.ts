import { useQueryClient, useMutation } from '@tanstack/react-query';
import { api } from '@/api/api';
import { toast } from 'sonner';
import type { GetStatesSeenResponse } from '@katieeitak/shared';

export function useUnmarkCapitolSeen() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.unmarkCapitolSeen,
    onError: () => {
      toast.error('There was an error unmarking capitol, please try again.');
    },
    onSuccess: async (data) => {
      queryClient.setQueryData<GetStatesSeenResponse>(['states-seen'], (old) => {
        if (!old) return old;
        return old.map((state) => {
          if (data.state_id === state.id) {
            return {
              ...state,
              capitol_date_seen: null,
            };
          } else {
            return state;
          }
        });
      });
    },
  });
}
