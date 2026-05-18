import type { AnxietyEvent } from '@katieeitak/shared';
import { Button, Dialog, Separator } from '@base-ui/react';
import { formatInTimeZone } from 'date-fns-tz';
import { useState, type ReactNode } from 'react';
import { Smile, Meh, Frown, PartyPopper, X, Pencil } from 'lucide-react';
import { getAnxietyEventTypeIcon } from '@/utils/getAnxietyEventTypeIcon';
import { anxietyEventTypeOptions } from '@katieeitak/shared';
import { useAppForm } from '@/hooks/useAppForm';

interface EditAnxietyEventViewProps {
  anxietyEvent: AnxietyEvent;
}

export function AnxietyEventCard({ anxietyEvent }: EditAnxietyEventViewProps) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useAppForm({
    defaultValues: {
      anxietyLevel: anxietyEvent.anxiety_level,
      excitementLevel: anxietyEvent.excitement_level,
      eventType: anxietyEvent.event_type,
      eventNotes: anxietyEvent.notes,
      eventTitle: anxietyEvent.title,
      eventDate: anxietyEvent.date_occurred,
    },
  });

  const date = anxietyEvent.date_occurred
    ? formatInTimeZone(anxietyEvent.date_occurred, 'UTC', 'MMM dd, yyyy')
    : 'Unknown';
  const anxietyIcon: ReactNode =
    anxietyEvent.anxiety_level <= 3 ? (
      <Smile size={14} />
    ) : anxietyEvent.anxiety_level <= 6 ? (
      <Meh size={14} />
    ) : (
      <Frown size={14} />
    );

  const typeIcon = getAnxietyEventTypeIcon({ eventType: anxietyEvent.event_type });
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div className="flex flex-col shadow-md rounded-md p-6 bg-white gap-2">
          <div className="flex flex-row items-center">
            <span className="font-semibold flex-1 text-left">{anxietyEvent.title}</span>
            {date && (
              <div className="flex flex-rowi items-center justify-end min-w-22">
                <span className="text-gray-400 text-sm">{date}</span>
              </div>
            )}
          </div>

          <div className="flex flex-row gap-2">
            <div className="rounded-md p-1 flex flex-row gap-1 items-center bg-muted-input shadow-sm">
              {anxietyIcon}
              <span className="text-sm">{anxietyEvent.anxiety_level}</span>
            </div>
            <div className="rounded-md p-1 flex flex-row gap-1 items-center bg-muted-input shadow-sm">
              <PartyPopper size={14} />
              <span className="text-sm">{anxietyEvent.excitement_level}</span>
            </div>
            <div className="rounded-md pl-2 pr-2 pt-1 pb-1 bg-muted-input shadow-sm flex items-center justify-center">
              {typeIcon}
            </div>
          </div>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 w-96 max-w-[calc(100vw-3rem)] max-h-[90dvh] -translate-x-1/2 -translate-y-1/2 flex flex-col overflow-hidden rounded-lg bg-gray-50 text-gray-900 outline-1 outline-gray-200 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline-gray-300">
          <div className="flex flex-row justify-between pl-6 pr-6 pt-4 pb-4 shrink-0">
            <h2 className="text-lg font-semibold">Event details</h2>
            <div className="flex flex-row gap-2">
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
              <div className="flex flex-row pl-6 pr-6 pt-4 pb-4 justify-end">
                <form.SubscribeButton
                  buttonText="Save"
                  textColor="text-white"
                  bgColor="bg-green-700"
                />
              </div>
            </form.AppForm>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
