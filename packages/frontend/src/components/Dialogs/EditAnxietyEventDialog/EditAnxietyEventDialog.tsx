import { Dialog, Button, Separator } from '@base-ui/react';
import { useState } from 'react';
import { X, Pencil } from 'lucide-react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { api } from '@/api/api';
import {
  type UpdateAnxietyEventBody,
  type AnxietyEvent,
  UpdateAnxietyEventBodySchema,
} from '@katieeitak/shared';
import { useAppForm } from '@/hooks/useAppForm';
import { toast } from 'sonner';
import { anxietyEventTypeOptions } from '@katieeitak/shared';
import { DeleteAnxietyEventAlert } from '@/components/Alerts/DeleteAnxietyEventAlert';

interface EditAnxietyEventDialogProps {
  anxietyEvent: AnxietyEvent;
  buttonSize: number;
}

export function EditAnxietyEventDialog({ anxietyEvent, buttonSize }: EditAnxietyEventDialogProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: (body: UpdateAnxietyEventBody) =>
      api.updateAnxietyEvent({ id: anxietyEvent.id, body }),
    onError: () => {
      toast.error('There was an error updating anxiety event, please try again.');
    },
    onSuccess: async () => {
      setOpen(false);
      setIsEditing(false);
      await queryClient.invalidateQueries({ queryKey: ['anxietyEvents', 'upcoming', 'expected'] });
    },
  });
  const form = useAppForm({
    defaultValues: {
      anxietyLevel: anxietyEvent.pre_anxiety_level,
      excitementLevel: anxietyEvent.pre_excitement_level,
      eventType: anxietyEvent.event_type,
      eventNotes: anxietyEvent.pre_notes,
      eventTitle: anxietyEvent.title,
      eventDate: anxietyEvent.date_occurred,
    },
    onSubmit: ({ value: formValues, formApi }) => {
      const defaultFormValues = formApi.options.defaultValues;
      if (!defaultFormValues) return;
      const changedFormValues: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(formValues)) {
        const typedKey = key as keyof typeof defaultFormValues;
        if (value !== defaultFormValues[typedKey]) {
          changedFormValues[typedKey] = value;
        }
      }
      const parsedChangedFormValues = UpdateAnxietyEventBodySchema.safeParse(changedFormValues);
      if (parsedChangedFormValues.error || !parsedChangedFormValues.data) {
        toast.error('There was an error updating anxiety event, please try again.');
        return;
      }
      mutate(parsedChangedFormValues.data);
    },
  });

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (open) {
          form.reset();
          setIsEditing(false);
        }
      }}
    >
      <div className="flex h-full w-full justify-center items-center">
        <Dialog.Trigger>
          <Pencil size={buttonSize} color="black" />
        </Dialog.Trigger>
      </div>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 w-96 max-w-[calc(100vw-3rem)] max-h-[90dvh] -translate-x-1/2 -translate-y-1/2 flex flex-col overflow-hidden rounded-lg bg-gray-50 text-gray-900 outline-1 outline-gray-200 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline-gray-300 data-nested-dialog-open:brightness-50 data-nested-dialog-open:pointer-events-none">
          <div className="flex flex-row justify-between pl-6 pr-6 pt-4 pb-4 shrink-0">
            <h2 className="text-lg font-semibold">Event details</h2>
            <div className="flex flex-row gap-2">
              <DeleteAnxietyEventAlert
                anxietyEvent={anxietyEvent}
                setParentWindowOpen={setOpen}
                status="upcoming"
              />
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className={`w-7 h-7 flex justify-center items-center rounded-md transition-colors ${
                  isEditing
                    ? 'bg-slate-300 text-slate-900'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Pencil size={16} />
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  setIsEditing(false);
                }}
                className="w-7 h-7 flex justify-center items-center rounded-md transition-colors text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={16} />
              </Button>
            </div>
          </div>

          <Separator orientation="horizontal" className="h-px w-full bg-lightgray shrink-0" />

          <form
            className="flex flex-col overflow-y-auto"
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit();
            }}
          >
            <div className="pt-6 pl-6 pr-6">
              <form.AppField
                name="eventTitle"
                children={(field) => (
                  <field.TextField label="Title" maxLength={20} isDisabled={!isEditing} />
                )}
              />
            </div>
            <div className="pt-6 pl-6 pr-6">
              <form.AppField
                name="eventDate"
                children={(field) => (
                  <field.SelectDateField label="Event Date" isDisabled={!isEditing} />
                )}
              />
            </div>
            <div className="pt-6 pl-6 pr-6">
              <form.AppField
                name="eventType"
                children={(field) => (
                  <field.SelectField
                    items={anxietyEventTypeOptions}
                    label="Event Type"
                    isDisabled={!isEditing}
                  />
                )}
              />
            </div>
            <div className="pt-6 pl-6 pr-6">
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
                    isDisabled={!isEditing}
                  />
                )}
              />
            </div>
            <div className="pt-6 pl-6 pr-6">
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
                    isDisabled={!isEditing}
                  />
                )}
              />
            </div>
            <div className="pt-6 pl-6 pr-6 pb-6">
              <form.AppField
                name="eventNotes"
                children={(field) => (
                  <field.TextAreaField label="Notes" maxLength={300} isDisabled={!isEditing} />
                )}
              />
            </div>
            <Separator orientation="horizontal" className="h-px w-full bg-lightgray shrink-0" />
            <form.AppForm>
              <div className="flex flex-row pl-6 pr-6 pt-4 pb-4 justify-end gap-2">
                <form.SubscribeButton
                  buttonText="Save"
                  textColor="text-white"
                  bgColor="bg-green-700"
                  isPending={isPending}
                />
              </div>
            </form.AppForm>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
