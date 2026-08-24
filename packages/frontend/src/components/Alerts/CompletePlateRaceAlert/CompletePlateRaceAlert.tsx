import { useCompletePlateRaceMutation } from '@/hooks/mutations/useCompletePlateRaceMutation';
import { useState } from 'react';
import { AlertDialog, Button } from '@base-ui/react';

interface CompletePlateRaceAlertProps {
  plateRaceId: string;
  className?: string;
}

export function CompletePlateRaceAlert({
  plateRaceId,
  className = '',
}: CompletePlateRaceAlertProps) {
  const { mutate } = useCompletePlateRaceMutation({ plateRaceId });
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <div className={className}>
        <AlertDialog.Trigger className="flex flex-row items-center gap-1">
          <span className="text-xs font-bold">Complete</span>
        </AlertDialog.Trigger>
      </div>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
        <AlertDialog.Popup className="fixed top-1/2 left-1/2 w-96 max-w-[calc(100vw-4.5rem)] max-h-[90dvh] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-gray-50 text-gray-900 outline-1 outline-gray-200 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline-gray-300">
          <div className="flex flex-col gap-4 px-6 py-4 shrink-0">
            <div className="flex flex-col">
              <h2 className="text-md font-semibold">Complete plate race?</h2>
              <span className="text-sm text-gray-400">
                You cannot edit a plate race once it's completed.
              </span>
            </div>

            <div className="flex justify-end gap-2.5">
              <Button
                className="text-sm border border-black font-semibold rounded-sm px-3 py-1"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-green-800 text-white text-sm font-semibold rounded-sm px-3 py-1"
                onClick={() => {
                  mutate({ plateRaceId });
                }}
              >
                Complete
              </Button>
            </div>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
