import { type LicensePlate } from '@katieeitak/shared';
import { LicensePlateCard } from '@/components/Cards/LicensePlates/LicensePlateCard';

interface LicensePlatesListProps {
  licensePlates: LicensePlate[];
}

export function LicensePlatesList({ licensePlates }: LicensePlatesListProps) {
  return (
    <div className="flex flex-col gap-3">
      {licensePlates.map((licensePlate) => (
        <LicensePlateCard licensePlate={licensePlate} />
      ))}
    </div>
  );
}
