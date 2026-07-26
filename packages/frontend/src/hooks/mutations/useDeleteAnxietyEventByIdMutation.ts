import { type InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/api';
import { toast } from 'sonner';
import { type AnxietyEventCursor, type GetAnxietyEventsResponse } from '@katieeitak/shared';

export function useDeleteAnxietyEventByIdMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteAnxietyEventById,
    onError: () => {
      toast.error('There was an error deleting anxiety event, please try again.');
    },
    onSuccess: async (_, variables) => {
      queryClient.setQueryData<InfiniteData<GetAnxietyEventsResponse, AnxietyEventCursor | null>>(
        ['anxietyEvents', 'upcoming', 'expected'],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              anxietyEvents: page.anxietyEvents.filter((event) => event.id !== variables.id),
            })),
          };
        },
      );
    },
  });
}
