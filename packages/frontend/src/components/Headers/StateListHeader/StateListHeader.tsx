import type { State } from '@katieeitak/shared';
interface StateListHeaderProps {
  stateList: State[];
}

export function StateListHeader({ stateList }: StateListHeaderProps) {
  let numOfMarkedStates = 0;
  let numOfMarkedCapitols = 0;

  for (let i = 0; i < stateList.length; i++) {
    const currState = stateList[i];
    if (currState.state_seen_date) numOfMarkedStates += 1;
    if (currState.capitol_seen_date) numOfMarkedCapitols += 1;
  }
  return (
    <div className="bg-mainbtn flex flex-col rounded-xl text-white p-4 gap-3">
      <div className="flex justify-between items-center gap-3">
        <span className="text-slate-100 font-semibold text-lg line-clamp-1">State Chase</span>
      </div>

      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-slate-300 text-xs font-semibold">State progress</span>
          <div className="flex flex-row font-bold text-xl gap-1">
            <span>{numOfMarkedStates}</span>
            <span className="text-slate-400 font-normal">/</span>
            <span className="text-slate-200">50</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-300 text-xs font-semibold">Capitol progress</span>
          <div className="flex flex-row font-bold text-xl gap-1">
            <span>{numOfMarkedCapitols}</span>
            <span className="text-slate-400 font-normal">/</span>
            <span className="text-slate-200">50</span>
          </div>
        </div>
      </div>
    </div>
  );
}
