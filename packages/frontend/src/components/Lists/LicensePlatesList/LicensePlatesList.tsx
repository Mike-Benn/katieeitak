import { type GetCurrentTripByUserIdResponse } from '@katieeitak/shared';
import { LicensePlateCard } from '@/components/Cards/LicensePlates/LicensePlateCard';
import { Ghost } from 'lucide-react';
import { NewTripDialog } from '@/components/Dialogs/NewTripDialog';

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
    <div className="flex flex-col gap-3">
      {currentTrip.plateList.map((licensePlate) => (
        <LicensePlateCard
          key={licensePlate.id}
          licensePlate={licensePlate}
          tripId={currentTrip.tripId}
        />
      ))}
    </div>
  );
}
