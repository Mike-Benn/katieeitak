import { type InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/api';
import { toast } from 'sonner';
import {
  type AnxietyEventCursor,
  type AnxietyEventOccurrenceType,
  type AnxietyEventStatus,
  type GetAnxietyEventsResponse,
} from '@katieeitak/shared';

interface UseDeleteAnxietyEventByIdMutationParams {
  status: AnxietyEventStatus;
  occurrenceType: AnxietyEventOccurrenceType;
}

export function useDeleteAnxietyEventByIdMutation({
  status,
  occurrenceType,
}: UseDeleteAnxietyEventByIdMutationParams) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteAnxietyEventById,
    onError: () => {
      toast.error('There was an error deleting anxiety event, please try again.');
    },
    onSuccess: async (_, variables) => {
      queryClient.setQueryData<InfiniteData<GetAnxietyEventsResponse, AnxietyEventCursor | null>>(
        ['anxietyEvents', status, occurrenceType],
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
