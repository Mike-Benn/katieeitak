import { useStatesSeen } from '@/hooks/queries/useStatesSeen';
import { StateList } from '@/components/Lists/StateList';
import { SvgSpinner } from '@/components/Loading/SvgSpinner';
export function StatesDashboard() {
  const statesSeenQuery = useStatesSeen();
  return (
    <div className="flex pt-6">
      {!statesSeenQuery.isFetching && statesSeenQuery.data && (
        <StateList stateList={statesSeenQuery.data} />
      )}
      {statesSeenQuery.isFetching && (
        <div className="flex-1 flex flex-col justify-center items-center">
          <SvgSpinner />
        </div>
      )}
    </div>
  );
}
