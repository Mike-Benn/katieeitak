import type { PlateRaceDescription } from '@katieeitak/shared';
import { Play, Flag } from 'lucide-react';
import { createReadableDate } from '@/utils/createReadableDate';

interface PlateRaceDescriptionCardProps {
  plateRaceDescription: PlateRaceDescription;
}

export function PlateRaceDescriptionCard({ plateRaceDescription }: PlateRaceDescriptionCardProps) {
  const createdAtString = createReadableDate({
    dateString: plateRaceDescription.created_at,
    dateStyle: 'MM/dd/yy',
  });
  const dateConcludedString = createReadableDate({
    dateString: plateRaceDescription.date_concluded,
    dateStyle: 'MM/dd/yy',
  });
  const plateCountPercent =
    plateRaceDescription.plates_seen_count &&
    plateRaceDescription.plates_seen_count >= 0 &&
    plateRaceDescription.plates_seen_count < 52
      ? Math.round((plateRaceDescription.plates_seen_count / 51) * 100)
      : 0;
  const plateCountPercentBgColor =
    plateCountPercent <= 33
      ? 'bg-red-200'
      : plateCountPercent <= 66
        ? 'bg-yellow-200'
        : 'bg-green-300';
  return (
    <div className="flex flex-col shadow-md rounded-2xl p-5 bg-white gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center gap-1">
          <span className="font-semibold text-lg min-w-0 line-clamp-1">
            {plateRaceDescription.title}
          </span>
          <div
            className={`px-1.5 py-1 rounded-lg text-center min-w-12.5 ${plateCountPercentBgColor}`}
          >
            <span className="tracking-wide text-sm font-semibold">{`${plateCountPercent}%`}</span>
          </div>
        </div>

        <span className="text-slate-500">{plateRaceDescription.plates_seen_count} of 51 seen</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr]">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-green-100 rounded-full">
            <Play size={16} className="text-green-700" />
          </div>
          <span className="text-slate-500 text-sm">{createdAtString}</span>
        </div>
        {plateRaceDescription.date_concluded && (
          <div className="flex items-center gap-2">
            <div className="p-1 bg-red-100 rounded-full">
              <Flag size={16} className="text-red-500 rounded-full" />
            </div>
            <span className="text-slate-500 text-sm">{dateConcludedString}</span>
          </div>
        )}
      </div>
    </div>
  );
}
