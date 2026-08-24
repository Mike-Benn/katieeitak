import { CompletePlateRaceAlert } from '@/components/Alerts/CompletePlateRaceAlert';
import { Check } from 'lucide-react';
import { createReadableDate } from '@/utils/createReadableDate';
interface LicensePlateListHeaderProps {
  title: string;
  plateCount: number;
  plateRaceId: string;
  dateConcluded: string | null;
}

export function LicensePlateListHeader({
  title,
  plateCount,
  plateRaceId,
  dateConcluded,
}: LicensePlateListHeaderProps) {
  return (
    <div className="bg-mainbtn flex flex-col rounded-xl text-white p-4 gap-3">
      <div className="flex justify-between items-center gap-3">
        <span className="text-slate-100 font-semibold text-lg line-clamp-1">{title}</span>

        {dateConcluded ? (
          <div className="bg-white text-mainbtn px-1.5 py-1.5 rounded-full shrink-0 select-none">
            <Check size={16} strokeWidth={3} />
          </div>
        ) : (
          <CompletePlateRaceAlert
            plateRaceId={plateRaceId}
            className="bg-white text-mainbtn flex items-center justify-center px-3 py-1.5 rounded-lg shrink-0 transition-colors hover:bg-slate-100"
          />
        )}
      </div>

      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-slate-300 text-xs font-semibold">
            {dateConcluded ? 'Final count' : 'Race progress'}
          </span>
          <div className="flex flex-row font-bold text-xl gap-1">
            <span>{plateCount}</span>
            <span className="text-slate-400 font-normal">/</span>
            <span className="text-slate-200">51</span>
          </div>
        </div>

        {/* The Date tucks nicely into the bottom right corner */}
        {dateConcluded && (
          <div className="text-xs text-slate-300 font-medium pb-1">
            Finished on {createReadableDate({ dateString: dateConcluded, dateStyle: 'MM/dd/yy' })}
          </div>
        )}
      </div>
    </div>
  );
}
