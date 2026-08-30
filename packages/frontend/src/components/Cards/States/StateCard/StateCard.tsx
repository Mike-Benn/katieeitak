import { Separator } from '@base-ui/react';
import { ActionCheckboxField } from '@/components/Forms/Fields/ActionCheckboxField';
import { useMarkStateSeenMutation } from '@/hooks/mutations/useMarkStateSeen';
import { useUnmarkStateSeen } from '@/hooks/mutations/useUnmarkStateSeen';
import { useMarkCapitolSeenMutation } from '@/hooks/mutations/useMarkCapitolSeen';
import { useUnmarkCapitolSeen } from '@/hooks/mutations/useUnmarkCapitolSeen';
import type { State } from '@katieeitak/shared';

interface StateCardProps {
  state: State;
}

export function StateCard({ state }: StateCardProps) {
  const markStateSeenMutation = useMarkStateSeenMutation();
  const markCapitolSeenMutation = useMarkCapitolSeenMutation();
  const unmarkStateSeenMutation = useUnmarkStateSeen();
  const unmarkCapitolSeenMutation = useUnmarkCapitolSeen();

  const handleStateToggle = (nextChecked: boolean) => {
    if (nextChecked) {
      markStateSeenMutation.mutate({ stateId: state.id });
    } else {
      unmarkStateSeenMutation.mutate({ stateId: state.id });
    }
  };
  const handleCapitolToggle = (nextChecked: boolean) => {
    if (nextChecked) {
      markCapitolSeenMutation.mutate({ stateId: state.id });
    } else {
      unmarkCapitolSeenMutation.mutate({ stateId: state.id });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 py-3">
        <div className="flex gap-2">
          <img src={state.flag_url} alt={`${state.name} state flag`} className="w-auto h-13" />
          <div className="flex flex-col">
            <span className="font-semibold text-xl">{state.name}</span>
            <span className="text-sm text-slate-500">{state.nickname}</span>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="flex items-center justify-center gap-2">
            <ActionCheckboxField
              isChecked={!!state.state_date_seen}
              isDisabled={false}
              isPending={markStateSeenMutation.isPending || unmarkStateSeenMutation.isPending}
              onToggle={handleStateToggle}
            />
            <span className="text-sm font-medium text-slate-700">State</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ActionCheckboxField
              isChecked={!!state.capitol_date_seen}
              isDisabled={false}
              isPending={markCapitolSeenMutation.isPending || unmarkCapitolSeenMutation.isPending}
              onToggle={handleCapitolToggle}
            />
            <span className="text-sm font-medium text-slate-700">Capitol</span>
          </div>
        </div>
      </div>
      <Separator orientation="horizontal" className="h-px bg-slate-300 w-full" />
    </>
  );
}
