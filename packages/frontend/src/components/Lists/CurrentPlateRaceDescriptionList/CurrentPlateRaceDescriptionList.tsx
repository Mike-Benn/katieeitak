import type { GetCurrentPlateRaceDescriptionResponse } from '@katieeitak/shared';
import { Ghost } from 'lucide-react';
import { NewPlateRaceDialog } from '@/components/Dialogs/NewPlateRaceDialog';
import { Link } from '@tanstack/react-router';
import { PlateRaceDescriptionCard } from '@/components/Cards/PlateRace/PlateRaceDescriptionCard';

interface CurrentPlateRaceDescriptionListParams {
  plateRaceDescription: GetCurrentPlateRaceDescriptionResponse | undefined;
}

export function CurrentPlateRaceDescriptionList({
  plateRaceDescription,
}: CurrentPlateRaceDescriptionListParams) {
  if (!plateRaceDescription) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-2">
        <Ghost size={42} color="black" />
        <span className="font-semibold">No active plate race</span>
        <NewPlateRaceDialog />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      <Link
        to="/america/plate-race/$id"
        key={plateRaceDescription.id}
        params={{ id: plateRaceDescription.id }}
      >
        <PlateRaceDescriptionCard plateRaceDescription={plateRaceDescription} />
      </Link>
    </div>
  );
}
