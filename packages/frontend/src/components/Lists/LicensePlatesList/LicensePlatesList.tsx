import { type GetTripDataResponse } from '@katieeitak/shared';
import { ActiveLicensePlateCard } from '@/components/Cards/LicensePlates/ActiveLicensePlateCard';
import { LicensePlateListHeader } from '@/components/Headers/LicensePlateListHeader';
import { StaticLicensePlateCard } from '@/components/Cards/LicensePlates/StaticLicensePlateCard';

interface LicensePlatesListProps {
  tripData?: GetTripDataResponse;
}
export function LicensePlatesList({ tripData }: LicensePlatesListProps) {
  if (!tripData) return <></>;
  const listData = tripData.trip.date_concluded
    ? tripData.plateList.map((licensePlate) => (
        <StaticLicensePlateCard key={licensePlate.id} licensePlate={licensePlate} />
      ))
    : tripData.plateList.map((licensePlate) => (
        <ActiveLicensePlateCard
          key={licensePlate.id}
          licensePlate={licensePlate}
          tripId={tripData.trip.id}
        />
      ));
  return (
    <div className="flex flex-col gap-6">
      <LicensePlateListHeader
        title={tripData.trip.title}
        plateCount={tripData.count}
        tripId={tripData.trip.id}
        dateConcluded={tripData.trip.date_concluded}
      />
      <div className="flex flex-col gap-3">{listData}</div>
    </div>
  );
}
