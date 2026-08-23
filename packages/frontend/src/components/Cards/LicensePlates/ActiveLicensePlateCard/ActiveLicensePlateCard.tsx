import type { LicensePlate } from '@katieeitak/shared';
import { Separator } from '@base-ui/react';
import { MarkSeenField } from '@/components/Forms/Fields/MarkSeenField';
import { format, parseISO, isValid } from 'date-fns';

interface ActiveLicensePlateCardProps {
  licensePlate: LicensePlate;
  tripId: string;
}

export function ActiveLicensePlateCard({ licensePlate, tripId }: ActiveLicensePlateCardProps) {
  let dateString: string;
  if (!licensePlate.date_seen) {
    dateString = 'N/A';
  } else {
    const parsedDate = parseISO(licensePlate.date_seen);
    dateString = isValid(parsedDate) ? format(parsedDate, 'MM/dd/yy') : 'N/A';
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img src={licensePlate.plate_url} alt="Alabama license plate" className="w-auto h-10" />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <span className="font-semibold leading-none">{licensePlate.name}</span>
              <span className="text-sm leading-none">{licensePlate.nickname}</span>
            </div>
            <span className="text-xs text-slate-500 leading-none">Seen: {dateString}</span>
          </div>
        </div>
        <div className="text-slate-400">
          <MarkSeenField
            timeSeen={licensePlate.date_seen}
            plateId={licensePlate.id}
            tripId={tripId}
            isDisabled={false}
          />
        </div>
      </div>
      <Separator orientation="horizontal" className="h-px bg-slate-300 w-full" />
    </>
  );
}
