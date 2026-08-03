import { Dialog, Button, Separator } from '@base-ui/react';
import { useCreateTripMutation } from '@/hooks/mutations/useCreateTripMutation';
import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useAppForm } from '@/hooks/useAppForm';
import { CreateTripByUserIdFormSchema } from '@katieeitak/shared';
import { toast } from 'sonner';

export function NewTripDialog() {
  const { mutate } = useCreateTripMutation();
  const [open, setOpen] = useState(false);
  const form = useAppForm({
    defaultValues: {
      title: '',
    },
    onSubmit: async ({ value: formValues }) => {
      mutate(
        {
          body: formValues,
        },
        {
          onSuccess: () => {
            setOpen(false);
            toast.success('New trip created!');
            form.reset();
          },
        },
      );
    },
    validators: {
      onSubmit: CreateTripByUserIdFormSchema,
    },
  });

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (open) {
          form.reset();
        }
      }}
    >
      <Dialog.Trigger className="flex items-center justify-center bg-mainbtn text-white py-2 px-4 rounded-sm">
        <Plus size={21} />
        <span className="font-semibold text-sm">Create a trip</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 w-96 max-w-[calc(100vw-4.5rem)] max-h-[90dvh] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-gray-50 text-gray-900 outline-1 outline-gray-200 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline-gray-300">
          <div className="flex flex-col px-6 py-4 shrink-0">
            <div className="flex justify-between items-center pb-4">
              <h2 className="text-md font-semibold">Create new trip</h2>
              <div>
                <Button
                  onClick={() => {
                    setOpen(false);
                    form.reset();
                  }}
                  className="w-6 h-6 flex justify-center items-center rounded-md transition-colors text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
            <Separator orientation="horizontal" className="h-px w-full bg-slate-300" />
            <div className="flex flex-col pt-4 pb-6">
              <form>
                <form.AppField
                  name="title"
                  children={(field) => (
                    <field.TextField label="Trip title" placeholder="e.g. 2025 plates" />
                  )}
                />
              </form>
            </div>

            <div className="flex justify-end gap-2.5">
              <Button
                className="text-sm border border-black rounded-sm px-3 py-1"
                onClick={() => {
                  setOpen(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <form.AppForm>
                <form.SubmitButton className="bg-mainbtn text-white" isPending={false}>
                  Create
                </form.SubmitButton>
              </form.AppForm>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
