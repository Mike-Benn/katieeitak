import { api } from '@/api/api';
import { PageWrapper } from '@/components/PageWrapper';
import { useAppForm } from '@/hooks/useAppForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { anxietyEventTypeOptions, AnxietyEventBodySchema } from '@katieeitak/shared';
import { SubmitButton } from '@/components/Buttons/SubmitButton';
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
      eventType: '',
      eventNotes: '',
      eventDate: undefined as string | undefined,
    },
    onSubmit: async ({ value }) => {
      const parsedValue = AnxietyEventBodySchema.safeParse(value);
      if (parsedValue.success) {
        mutate(parsedValue.data);
      } else {
        throw new Error('Submit error');
      }
    },
    validators: {
      onSubmit: AnxietyEventBodySchema,
    },
  });

  return (
    <PageWrapper className="p-6 gap-6">
      <h1 className="text-2xl font-semibold">Create new event</h1>
      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
      >
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
          <SubmitButton isSubmitting={isPending} />
        </div>
      </form>
    </PageWrapper>
  );
}
