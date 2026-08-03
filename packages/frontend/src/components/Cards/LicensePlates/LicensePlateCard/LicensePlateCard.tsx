import type { LicensePlate } from '@katieeitak/shared';
import { Separator } from '@base-ui/react';
import { MarkSeenField } from '@/components/Forms/Fields/MarkSeenField';

interface LicensePlateCardProps {
  licensePlate: LicensePlate;
  tripId: string;
}

export function LicensePlateCard({ licensePlate, tripId }: LicensePlateCardProps) {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <img src={licensePlate.plate_url} alt="Alabama license plate" className="w-auto h-10" />
          <div className="flex flex-col justify-center">
            <span className="font-semibold">{licensePlate.name}</span>
            <span className="text-xs">{licensePlate.nickname}</span>
          </div>
        </div>
        <div className="text-slate-400">
          <MarkSeenField
            timeSeen={licensePlate.date_seen}
            plateId={licensePlate.id}
            tripId={tripId}
          />
        </div>
      </div>
      <Separator orientation="horizontal" className="h-px bg-slate-300 w-full" />
    </>
  );
}
