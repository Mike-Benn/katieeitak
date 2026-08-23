import { type GetTripDataResponse } from '@katieeitak/shared';
import { LicensePlateCard } from '@/components/Cards/LicensePlates/LicensePlateCard';
import { Ghost } from 'lucide-react';
import { NewTripDialog } from '@/components/Dialogs/NewTripDialog';
import { LicensePlateListHeader } from '@/components/Headers/LicensePlateListHeader';

interface LicensePlatesListProps {
  tripData?: GetTripDataResponse;
}
export function LicensePlatesList({ tripData }: LicensePlatesListProps) {
  if (!tripData)
    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-2">
        <Ghost size={42} color="black" />
        <span className="font-semibold">No active trip</span>
        <NewTripDialog />
      </div>
    );
  return (
    <div className="flex flex-col gap-6">
      <LicensePlateListHeader
        title={tripData.trip.title}
        plateCount={tripData.count}
        tripId={tripData.trip.id}
      />
      <div className="flex flex-col gap-3">
        {tripData.plateList.map((licensePlate) => (
          <LicensePlateCard
            key={licensePlate.id}
            licensePlate={licensePlate}
            tripId={tripData.trip.id}
          />
        ))}
      </div>
    </div>
  );
}
