import { StateCard } from '@/components/Cards/States/StateCard';
import type { State } from '@katieeitak/shared';
import { StateListHeader } from '@/components/Headers/StateListHeader';

interface StateListProps {
  stateList: State[];
}

export function StateList({ stateList }: StateListProps) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <StateListHeader stateList={stateList} />
      <div className="flex flex-col gap-3">
        {stateList.map((state) => (
          <StateCard key={state.id} state={state} />
        ))}
      </div>
    </div>
  );
}
