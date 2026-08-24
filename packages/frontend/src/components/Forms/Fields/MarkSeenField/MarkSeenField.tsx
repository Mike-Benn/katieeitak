import { Checkbox } from '@base-ui/react/checkbox';
import { Check, Loader2 } from 'lucide-react';
import { useMarkPlateSeenMutation } from '@/hooks/mutations/useMarkPlateSeenMutation';
import { useUnmarkPlateSeenMutation } from '@/hooks/mutations/useUnmarkPlateSeenMutation';

interface MarkSeenFieldProps {
  timeSeen: string | null;
  plateId: number;
  plateRaceId: string;
  isDisabled: boolean;
}

export function MarkSeenField({ timeSeen, plateId, plateRaceId, isDisabled }: MarkSeenFieldProps) {
  const markPlateMutation = useMarkPlateSeenMutation({ plateRaceId });
  const unmarkPlateMutation = useUnmarkPlateSeenMutation({ plateRaceId });

  const isChecked = timeSeen !== null;
  const isPending = markPlateMutation.isPending || unmarkPlateMutation.isPending;

  return (
    <Checkbox.Root
      checked={isChecked}
      disabled={isPending || isDisabled}
      onCheckedChange={() => {
        if (isChecked) {
          unmarkPlateMutation.mutate({ stateId: plateId, plateRaceId });
        } else {
          markPlateMutation.mutate({ stateId: plateId, plateRaceId });
        }
      }}
      className="
        relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full
        border-[1.5px] border-neutral-300 bg-transparent outline-none
        transition-colors duration-150
        data-checked:border-transparent data-checked:bg-mainbtn
        data-disabled:cursor-not-allowed data-disabled:bg-transparent data-disabled:border-neutral-300
        not-data-disabled:cursor-pointer not-data-disabled:hover:border-neutral-400
      "
    >
      <span
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-150 ${
          isPending ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Loader2 className="h-3 w-3 animate-spin text-neutral-400" />
      </span>

      <Checkbox.Indicator
        keepMounted
        className={`flex items-center justify-center transition-all duration-150 ${
          isPending
            ? 'opacity-0 scale-50'
            : 'data-unchecked:opacity-0 data-unchecked:scale-50 data-checked:opacity-100 data-checked:scale-100'
        }`}
      >
        <Check className="h-3 w-3 text-white" strokeWidth={2.5} />
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
}
