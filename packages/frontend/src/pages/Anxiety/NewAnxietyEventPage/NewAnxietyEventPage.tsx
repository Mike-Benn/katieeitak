import { api } from '@/api/api';
import { PageWrapper } from '@/components/PageWrapper';
import { useAppForm } from '@/hooks/useAppForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import {
  anxietyEventTypeOptions,
  AnxietyEventBodySchema,
  type AnxietyEventBody,
  type AnxietyEventType,
} from '@katieeitak/shared';
import { toast } from 'sonner';

export function NewAnxietyEventPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: api.submitAnxietyEvent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['anxietyEvents'] });
      void navigate({ to: '/anxiety' });
    },
    onError: async () => {
      toast.error('There was an error submitting, please try again.');
    },
  });
  const form = useAppForm({
    defaultValues: {
      anxietyLevel: 5,
      excitementLevel: 5,
      eventType: '' as AnxietyEventType,
      eventNotes: '',
      eventTitle: '',
      eventDate: undefined as string | undefined,
    },
    onSubmit: async ({ value }) => {
      const parsedValue = value as AnxietyEventBody;
      mutate(parsedValue);
    },
    validators: {
      onSubmit: AnxietyEventBodySchema,
    },
  });

  return (
    <PageWrapper className="p-6 gap-6 bg-muted-bg">
      <h2 className="text-2xl font-semibold">Create new event</h2>
      <form
        className="flex flex-col p-6 rounded-md gap-8 bg-white"
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
      >
        <form.AppField
          name="eventTitle"
          children={(field) => (
            <field.TextField label="Title" maxLength={20} placeholder="e.g. Kidney failure" />
          )}
        />
        <form.AppField
          name="eventDate"
          children={(field) => <field.SelectDateField label="Event Date" />}
        />
        <form.AppField
          name="eventType"
          children={(field) => (
            <field.SelectField items={anxietyEventTypeOptions} label="Event Type" />
          )}
        />

        <form.AppField
          name="anxietyLevel"
          children={(field) => (
            <field.SliderField
              min={0}
              max={10}
              step={1}
              label="Anxiety Level"
              minLabel="0"
              maxLabel="10"
            />
          )}
        />
        <form.AppField
          name="excitementLevel"
          children={(field) => (
            <field.SliderField
              min={0}
              max={10}
              step={1}
              label="Excitement Level"
              minLabel="0"
              maxLabel="10"
            />
          )}
        />
        <form.AppField
          name="eventNotes"
          children={(field) => <field.TextAreaField label="Notes" maxLength={300} />}
        />
        <div className="flex flex-row justify-end">
          <form.AppForm>
            <form.SubscribeButton buttonText="Submit" isPending={isPending} />
          </form.AppForm>
        </div>
      </form>
    </PageWrapper>
  );
}
