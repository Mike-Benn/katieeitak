import { CompleteTripAlert } from '@/components/Alerts/CompleteTripAlert';

interface LicensePlateListHeaderProps {
  title: string;
  plateCount: number;
  tripId: string;
}

export function LicensePlateListHeader({ title, plateCount, tripId }: LicensePlateListHeaderProps) {
  return (
    <div className="bg-mainbtn flex flex-col rounded-xl text-white p-4 gap-2">
      <div className="flex justify-between items-center gap-1">
        <span className="text-slate-100 font-semibold text-lg line-clamp-1">{title}</span>
        <CompleteTripAlert
          tripId={tripId}
          className="bg-white text-mainbtn flex items-center justify-center px-2 py-2 rounded-lg"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-slate-300 text-xs font-semibold">Race progress</span>
        <div className="flex flex-row font-bold text-xl gap-1">
          <span>{plateCount}</span>
          <span>/</span>
          <span>51</span>
        </div>
      </div>
    </div>
  );
}
