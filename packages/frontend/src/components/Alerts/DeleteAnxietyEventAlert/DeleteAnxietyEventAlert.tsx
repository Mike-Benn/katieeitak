import { AlertDialog, Button } from '@base-ui/react';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import type { AnxietyEvent, AnxietyEventStatus } from '@katieeitak/shared';
import { toast } from 'sonner';
import { useDeleteAnxietyEventByIdMutation } from '@/hooks/mutations/useDeleteAnxietyEventByIdMutation';

interface DeleteAnxietyEventAlertProps {
  anxietyEvent: AnxietyEvent;
  setParentWindowOpen: (val: boolean) => void;
  status: AnxietyEventStatus;
}

export function DeleteAnxietyEventAlert({
  anxietyEvent,
  setParentWindowOpen,
  status,
}: DeleteAnxietyEventAlertProps) {
  const { mutate } = useDeleteAnxietyEventByIdMutation({
    status,
    occurrenceType: anxietyEvent.is_unplanned ? 'unplanned' : 'expected',
  });
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <div className="w-7 h-7 flex justify-center items-center">
        <AlertDialog.Trigger>
          <Trash2 size={21} className="text-slate-500" />
        </AlertDialog.Trigger>
      </div>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
        <AlertDialog.Popup className="fixed top-1/2 left-1/2 w-96 max-w-[calc(100vw-4.5rem)] max-h-[90dvh] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-gray-50 text-gray-900 outline-1 outline-gray-200 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline-gray-300">
          <div className="flex flex-col gap-4 px-6 py-4 shrink-0">
            <div className="flex flex-col">
              <h2 className="text-md font-semibold">Delete event?</h2>
              <span className="text-sm text-gray-400">This action cannot be undone.</span>
            </div>

            <div className="flex justify-end gap-2.5">
              <Button
                className="text-sm border border-black rounded-sm px-3 py-1"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 text-white text-sm rounded-sm px-3 py-1"
                onClick={() => {
                  mutate(
                    { id: anxietyEvent.id },
                    {
                      onSuccess: () => {
                        setOpen(false);
                        setParentWindowOpen(false);

                        toast.success('Anxiety event deleted successfully!');
                      },
                    },
                  );
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

/*
interface DeleteAnxietyEventAlertProps {
  anxietyEvent: AnxietyEvent;
  setEditOpen: (val: boolean) => void;
}

export function DeleteAnxietyEventAlert({
  anxietyEvent,
  setEditOpen,
}: DeleteAnxietyEventAlertProps) {
  const { mutate } = useDeleteAnxietyEventByIdMutation();
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <div className="w-7 h-7 flex justify-center items-center">
        <AlertDialog.Trigger>
          <Trash2 size={21} className="text-slate-500" />
        </AlertDialog.Trigger>
      </div>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
        <AlertDialog.Popup className="fixed top-1/2 left-1/2 w-96 max-w-[calc(100vw-4.5rem)] max-h-[90dvh] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-gray-50 text-gray-900 outline-1 outline-gray-200 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline-gray-300">
          <div className="flex flex-col gap-4 px-6 py-4 shrink-0">
            <div className="flex flex-col">
              <h2 className="text-md font-semibold">Delete event?</h2>
              <span className="text-sm text-gray-400">This action cannot be undone.</span>
            </div>

            <div className="flex justify-end gap-2.5">
              <Button
                className="text-sm border border-black rounded-sm px-3 py-1"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 text-white text-sm rounded-sm px-3 py-1"
                onClick={() => {
                  mutate(
                    { id: anxietyEvent.id },
                    {
                      onSuccess: () => {
                        setOpen(false);
                        setEditOpen(false);
                        toast.success('Anxiety event deleted successfully!');
                      },
                    },
                  );
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}




*/
