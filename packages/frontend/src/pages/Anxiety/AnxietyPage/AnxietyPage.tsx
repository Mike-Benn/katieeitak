import { PageWrapper } from '@/components/PageWrapper';
import { useAppForm } from '@/hooks/useAppForm';
import { anxietyEventTypeOptions } from '@katieeitak/shared';

export function AnxietyPage() {
  const form = useAppForm({
    defaultValues: {
      anxietyLevel: 5,
      excitementLevel: 5,
      eventType: '',
      eventNotes: '',
      eventDate: undefined as Date | undefined,
    },
  });
  return (
    <PageWrapper className="p-6 gap-6">
      <h1 className="text-2xl font-semibold">Create new event</h1>
      <form className="flex flex-col gap-8">
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
          children={(field) => <field.TextAreaField label="Notes" />}
        />
      </form>
    </PageWrapper>
  );
}
