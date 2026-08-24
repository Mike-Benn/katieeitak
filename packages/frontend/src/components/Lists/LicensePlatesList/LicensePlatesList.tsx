import { type GetPlateRaceDataResponse } from '@katieeitak/shared';
import { ActiveLicensePlateCard } from '@/components/Cards/LicensePlates/ActiveLicensePlateCard';
import { LicensePlateListHeader } from '@/components/Headers/LicensePlateListHeader';
import { StaticLicensePlateCard } from '@/components/Cards/LicensePlates/StaticLicensePlateCard';

interface LicensePlatesListProps {
  plateRaceData?: GetPlateRaceDataResponse;
}
export function LicensePlatesList({ plateRaceData }: LicensePlatesListProps) {
  if (!plateRaceData) return <></>;
  const listData = plateRaceData.plateRace.date_concluded
    ? plateRaceData.plateList.map((licensePlate) => (
        <StaticLicensePlateCard key={licensePlate.id} licensePlate={licensePlate} />
      ))
    : plateRaceData.plateList.map((licensePlate) => (
        <ActiveLicensePlateCard
          key={licensePlate.id}
          licensePlate={licensePlate}
          plateRaceId={plateRaceData.plateRace.id}
        />
      ));
  return (
    <div className="flex flex-col gap-6">
      <LicensePlateListHeader
        title={plateRaceData.plateRace.title}
        plateCount={plateRaceData.count}
        plateRaceId={plateRaceData.plateRace.id}
        dateConcluded={plateRaceData.plateRace.date_concluded}
      />
      <div className="flex flex-col gap-3">{listData}</div>
    </div>
  );
}
