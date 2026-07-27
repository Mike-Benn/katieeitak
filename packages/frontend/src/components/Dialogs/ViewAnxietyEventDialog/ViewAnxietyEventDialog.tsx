import { useAppForm } from '@/hooks/useAppForm';
import { Dialog, Button, Separator } from '@base-ui/react';
import { anxietyEventTypeOptions, type AnxietyEvent } from '@katieeitak/shared';
import { X, Eye, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { parseISO, format, isValid } from 'date-fns';

interface ViewAnxietyEventDialogProps {
  anxietyEvent: AnxietyEvent;
  buttonSize: number;
}

export function ViewAnxietyEventDialog({ anxietyEvent, buttonSize }: ViewAnxietyEventDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useAppForm({
    defaultValues: {
      preAnxietyLevel: anxietyEvent.pre_anxiety_level,
      preExcitementLevel: anxietyEvent.pre_excitement_level,
      preNotes: anxietyEvent.pre_notes,
      postAnxietyLevel: anxietyEvent.post_anxiety_level,
      postExcitementLevel: anxietyEvent.post_excitement_level,
      postNotes: anxietyEvent.post_notes,
      eventType: anxietyEvent.event_type,
      eventTitle: anxietyEvent.title,
    },
    onSubmit: () => {
      return;
    },
  });
  const parsedDate = parseISO(anxietyEvent.date_occurred);

  const cleanDate = isValid(parsedDate) ? format(parsedDate, 'MMMM d, yyyy') : 'Unknown Date';
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className="flex justify-center items-center">
        <Dialog.Trigger>
          <Eye size={buttonSize} color="black" />
        </Dialog.Trigger>
      </div>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 w-96 max-w-[calc(100vw-3rem)] max-h-[90dvh] -translate-x-1/2 -translate-y-1/2 flex flex-col overflow-hidden rounded-lg bg-gray-50 text-gray-900 outline-1 outline-gray-200 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 data-nested-dialog-open:brightness-50 data-nested-dialog-open:pointer-events-none">
          <div className="flex flex-row justify-between px-6 py-4 shrink-0">
            <span className="text-slate-500">{cleanDate}</span>
            <div className="flex flex-row gap-2 text-slate-500">
              <div className="w-7 h-7 flex justify-center items-center">
                <Trash2 size={21} className="text-slate-500" />
              </div>
              <Button
                onClick={() => {
                  setOpen(false);
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
              return;
            }}
          >
            <div className="pt-6 px-6">
              <form.AppField
                name="eventTitle"
                children={(field) => (
                  <field.TextField label="Title" maxLength={20} isDisabled={true} />
                )}
              />
            </div>
            <div className="pt-6 px-6">
              <form.AppField
                name="eventType"
                children={(field) => (
                  <field.SelectField
                    label="Event type"
                    items={anxietyEventTypeOptions}
                    isDisabled={true}
                  />
                )}
              />
            </div>
            {!anxietyEvent.is_unplanned && (
              <>
                <Separator
                  orientation="horizontal"
                  className="h-px w-full bg-lightgray shrink-0 mt-8"
                />
                <h2 className="font-semibold pt-6 px-6 text-xl">Pre-event</h2>
                <div className="pt-6 px-6">
                  <form.AppField
                    name="preAnxietyLevel"
                    children={(field) => (
                      <field.SliderField
                        min={0}
                        max={10}
                        step={1}
                        label="Anxiety level"
                        minLabel="0"
                        maxLabel="10"
                        isDisabled={true}
                      />
                    )}
                  />
                </div>
                <div className="pt-6 px-6">
                  <form.AppField
                    name="preExcitementLevel"
                    children={(field) => (
                      <field.SliderField
                        min={0}
                        max={10}
                        step={1}
                        label="Excitement level"
                        minLabel="0"
                        maxLabel="10"
                        isDisabled={true}
                      />
                    )}
                  />
                </div>
                <div className="pt-6 px-6">
                  <form.AppField
                    name="preNotes"
                    children={(field) => (
                      <field.TextAreaField maxLength={300} label="Notes" isDisabled={true} />
                    )}
                  />
                </div>
              </>
            )}

            <Separator
              orientation="horizontal"
              className="h-px w-full bg-lightgray shrink-0 mt-8"
            />
            <h2 className="font-semibold pt-6 px-6 text-xl">Post-event</h2>
            <div className="pt-6 px-6">
              <form.AppField
                name="postAnxietyLevel"
                children={(field) => (
                  <field.SliderField
                    min={0}
                    max={10}
                    step={1}
                    label="Anxiety level"
                    minLabel="0"
                    maxLabel="10"
                    isDisabled={true}
                  />
                )}
              />
            </div>
            <div className="pt-6 px-6">
              <form.AppField
                name="postExcitementLevel"
                children={(field) => (
                  <field.SliderField
                    min={0}
                    max={10}
                    step={1}
                    label="Excitement level"
                    minLabel="0"
                    maxLabel="10"
                    isDisabled={true}
                  />
                )}
              />
            </div>
            <div className="p-6">
              <form.AppField
                name="postNotes"
                children={(field) => (
                  <field.TextAreaField maxLength={300} label="Notes" isDisabled={true} />
                )}
              />
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
