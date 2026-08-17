import { NewTripDialog } from '@/components/Dialogs/NewTripDialog';
import type { GetTripDescriptionsResponse, TripDescriptionsCursor } from '@katieeitak/shared';
import type { InfiniteData } from '@tanstack/react-query';
import { Ghost } from 'lucide-react';
import React from 'react';
import { PlateRaceDescriptionCard } from '@/components/Cards/PlateRace/PlateRaceDescriptionCard';

interface PlateRaceDescriptionsListProps {
  plateRaceDescriptionsResponse: InfiniteData<
    GetTripDescriptionsResponse,
    TripDescriptionsCursor | null
  >;
  hasNextPage: boolean;
  listType: 'current' | 'past';
}

export function PlateRaceDescriptionsList({
  plateRaceDescriptionsResponse,
  hasNextPage,
  listType,
}: PlateRaceDescriptionsListProps) {
  const totalPlateRaces = plateRaceDescriptionsResponse.pages.reduce(
    (count, page) => count + page.tripDescriptions.length,
    0,
  );
  if (totalPlateRaces === 0 && !hasNextPage) {
    if (listType === 'current') {
      return (
        <div className="flex-1 flex flex-col justify-center items-center gap-2">
          <Ghost size={42} color="black" />
          <span className="font-semibold">No active plate race</span>
          <NewTripDialog />
        </div>
      );
    } else {
      return (
        <div className="flex-1 flex flex-col justify-center items-center gap-2 text-slate-500">
          <Ghost size={42} />
          <span className="text-sm font-semibold">No past plate races found</span>
        </div>
      );
    }
  }
  return (
    <div className="flex flex-col gap-6">
      {plateRaceDescriptionsResponse.pages.map((page, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index}>
          {page.tripDescriptions.map((plateRaceDescription) => (
            <PlateRaceDescriptionCard
              key={plateRaceDescription.id}
              plateRaceDescription={plateRaceDescription}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
