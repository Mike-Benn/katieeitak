import { Dialog, Button, Separator } from '@base-ui/react';
import { useState } from 'react';
import { X, CircleCheckBig } from 'lucide-react';
import { useAppForm } from '@/hooks/useAppForm';
import { toast } from 'sonner';
import { CompleteAnxietyEventByIdFormSchema, type AnxietyEvent } from '@katieeitak/shared';
import { useCompleteAnxietyEventByIdMutation } from '@/hooks/mutations/useCompleteAnxietyEventByIdMutation';

interface CompleteAnxietyEventDrawerProps {
  anxietyEvent: AnxietyEvent;
  buttonSize: number;
}

export function CompleteAnxietyEventDrawer({
  anxietyEvent,
  buttonSize,
}: CompleteAnxietyEventDrawerProps) {
  const [open, setOpen] = useState(false);
  const { mutate } = useCompleteAnxietyEventByIdMutation();
  const form = useAppForm({
    defaultValues: {
      postAnxietyLevel: 5,
      postExcitementLevel: 5,
      postNotes: '',
    },
    onSubmit: async ({ value: formValues }) => {
      mutate(
        {
          id: anxietyEvent.id,
          payload: {
            postAnxietyLevel: formValues.postAnxietyLevel,
            postExcitementLevel: formValues.postExcitementLevel,
            postNotes: formValues.postNotes,
          },
        },
        {
          onSuccess: () => {
            setOpen(false);
            toast.success('Anxiety event completed!');
          },
        },
      );
    },
    validators: {
      onSubmit: CompleteAnxietyEventByIdFormSchema,
    },
  });

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <div className="flex h-full w-full justify-center items-center">
        <Dialog.Trigger>
          <CircleCheckBig size={buttonSize} color="green" />
        </Dialog.Trigger>
      </div>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup className="fixed bottom-0 inset-x-0 w-full max-h-[90dvh] flex flex-col overflow-hidden rounded-t-lg bg-gray-50 text-gray-900 outline-1 outline-gray-200 transition-all duration-300 data-ending-style:translate-y-full data-ending-style:opacity-0 data-starting-style:translate-y-full data-starting-style:opacity-0 dark:outline-gray-300">
          <div className="flex flex-row justify-between pl-6 pr-6 pt-4 pb-4">
            <div>
              <Button
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex justify-center items-center rounded-md transition-colors text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={16} />
              </Button>
            </div>
            <h2 className="text-lg font-semibold">Post anxiety event</h2>
            <form.AppForm>
              <div>
                <form.SaveButton className="w-7 h-7 flex justify-center items-center rounded-md disabled:opacity-50">
                  Save
                </form.SaveButton>
              </div>
            </form.AppForm>
          </div>
          <Separator orientation="horizontal" className="h-px w-full bg-lightgray" />
          <form
            className="flex flex-col overflow-y-auto"
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit();
            }}
          >
            <div className="pt-6 pl-6 pr-6">
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
                  />
                )}
              />
            </div>
            <div className="pt-6 pl-6 pr-6">
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
                  />
                )}
              />
            </div>
            <div className="p-6 flex justify-center">
              <form.AppField
                name="postNotes"
                children={(field) => <field.TextAreaField label="Notes" maxLength={300} />}
              />
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
