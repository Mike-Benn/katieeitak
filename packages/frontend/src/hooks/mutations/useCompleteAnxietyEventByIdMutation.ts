import { useQueryClient, useMutation, type InfiniteData } from '@tanstack/react-query';
import { api } from '@/api/api';
import { toast } from 'sonner';
import { type GetAnxietyEventsResponse, type AnxietyEventCursor } from '@katieeitak/shared';

export function useCompleteAnxietyEventByIdMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.completeAnxietyEventById,
    onError: () => {
      toast.error('There was an error completing anxiety event, please try again.');
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
      await queryClient.resetQueries({ queryKey: ['anxietyEvents', 'completed', 'expected'] });
    },
  });
}
