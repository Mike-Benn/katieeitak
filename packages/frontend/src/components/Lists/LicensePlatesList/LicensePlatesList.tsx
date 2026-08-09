import { type GetCurrentTripByUserIdResponse } from '@katieeitak/shared';
import { LicensePlateCard } from '@/components/Cards/LicensePlates/LicensePlateCard';
import { Ghost } from 'lucide-react';
import { NewTripDialog } from '@/components/Dialogs/NewTripDialog';
import { CompleteTripAlert } from '@/components/Alerts/CompleteTripAlert';
import { Separator } from '@base-ui/react';

interface LicensePlatesListProps {
  currentTrip?: GetCurrentTripByUserIdResponse;
}
export function LicensePlatesList({ currentTrip }: LicensePlatesListProps) {
  if (!currentTrip)
    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-2">
        <Ghost size={42} color="black" />
        <span className="font-semibold">No active trip</span>
        <NewTripDialog />
      </div>
    );

  return (
    <div>
      <header className="flex flex-col gap-3 pb-3">
        <div className="flex flex-col gap-1 min-w-0">
          <Separator orientation="horizontal" className="h-px bg-slate-300 w-full" />
          <span className="text-center font-semibold line-clamp-1">{currentTrip.title}</span>
          <Separator orientation="horizontal" className="h-px bg-slate-300 w-full" />
        </div>
        <CompleteTripAlert
          tripId={currentTrip.tripId}
          className="px-2.5 py-2 bg-green-800 text-white rounded-md ml-auto"
        />
      </header>
      <div className="flex flex-col gap-3">
        {currentTrip.plateList.map((licensePlate) => (
          <LicensePlateCard
            key={licensePlate.id}
            licensePlate={licensePlate}
            tripId={currentTrip.tripId}
          />
        ))}
      </div>
    </div>
  );
}
