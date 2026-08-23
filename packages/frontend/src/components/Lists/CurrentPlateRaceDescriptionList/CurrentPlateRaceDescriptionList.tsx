import type { GetCurrentTripDescriptionResponse } from '@katieeitak/shared';
import { Ghost } from 'lucide-react';
import { NewTripDialog } from '@/components/Dialogs/NewTripDialog';
import { Link } from '@tanstack/react-router';
import { PlateRaceDescriptionCard } from '@/components/Cards/PlateRace/PlateRaceDescriptionCard';

interface CurrentPlateRaceDescriptionListParams {
  plateRaceDescription: GetCurrentTripDescriptionResponse;
}

export function CurrentPlateRaceDescriptionList({
  plateRaceDescription,
}: CurrentPlateRaceDescriptionListParams) {
  if (!plateRaceDescription) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-2">
        <Ghost size={42} color="black" />
        <span className="font-semibold">No active plate race</span>
        <NewTripDialog />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      <Link
        to="/license-plates/$id"
        key={plateRaceDescription.id}
        params={{ id: plateRaceDescription.id }}
      >
        <PlateRaceDescriptionCard plateRaceDescription={plateRaceDescription} />
      </Link>
    </div>
  );
}
