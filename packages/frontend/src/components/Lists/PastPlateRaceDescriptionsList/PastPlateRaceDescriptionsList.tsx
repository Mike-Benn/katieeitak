import type {
  GetPastPlateRaceDescriptionsResponse,
  PlateRaceDescriptionsCursor,
} from '@katieeitak/shared';
import type { InfiniteData } from '@tanstack/react-query';
import { Ghost } from 'lucide-react';
import React from 'react';
import { PlateRaceDescriptionCard } from '@/components/Cards/PlateRace/PlateRaceDescriptionCard';
import { Link } from '@tanstack/react-router';

interface PastPlateRaceDescriptionsListProps {
  pastPlateRaceDescriptionsResponse: InfiniteData<
    GetPastPlateRaceDescriptionsResponse,
    PlateRaceDescriptionsCursor | null
  >;
  hasNextPage: boolean;
}

export function PastPlateRaceDescriptionsList({
  pastPlateRaceDescriptionsResponse,
  hasNextPage,
}: PastPlateRaceDescriptionsListProps) {
  const totalPlateRaces = pastPlateRaceDescriptionsResponse.pages.reduce(
    (count, page) => count + page.plateRaceDescriptions.length,
    0,
  );
  if (totalPlateRaces === 0 && !hasNextPage) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-2 text-slate-500">
        <Ghost size={42} />
        <span className="text-sm font-semibold">No past plate races found</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      {pastPlateRaceDescriptionsResponse.pages.map((page, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index}>
          {page.plateRaceDescriptions.map((plateRaceDescription) => (
            <Link
              to="/plate-races/$id"
              key={plateRaceDescription.id}
              params={{ id: plateRaceDescription.id }}
            >
              <PlateRaceDescriptionCard plateRaceDescription={plateRaceDescription} />
            </Link>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
