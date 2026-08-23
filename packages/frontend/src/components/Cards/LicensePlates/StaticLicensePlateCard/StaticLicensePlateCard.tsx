import type { LicensePlate } from '@katieeitak/shared';
import { createReadableDate } from '@/utils/createReadableDate';
import { Separator } from '@base-ui/react';
import { Check } from 'lucide-react';

interface StaticLicensePlateCardProps {
  licensePlate: LicensePlate;
}

export function StaticLicensePlateCard({ licensePlate }: StaticLicensePlateCardProps) {
  const dateString = createReadableDate({
    dateString: licensePlate.date_seen,
    dateStyle: 'MM/dd/yy',
    altText: 'N/A',
  });

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
          <div
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] opacity-60 ${licensePlate.date_seen ? 'border-transparent bg-mainbtn' : 'border-neutral-300 bg-transparent'}`}
            aria-hidden="true"
          >
            {licensePlate.date_seen && <Check className="h-3 w-3 text-white" strokeWidth={2.5} />}
          </div>
        </div>
      </div>
      <Separator orientation="horizontal" className="h-px bg-slate-300 w-full" />
    </>
  );
}
