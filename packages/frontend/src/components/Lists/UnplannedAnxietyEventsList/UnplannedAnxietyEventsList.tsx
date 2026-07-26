import type { InfiniteData } from '@tanstack/react-query';
import type { AnxietyEventCursor, GetAnxietyEventsResponse } from '@katieeitak/shared';
import { UnplannedAnxietyEventCard } from '@/components/Cards/AnxietyEvent/UnplannedAnxietyEventCard';
import { Ghost } from 'lucide-react';
import React from 'react';

interface UnplannedAnxietyEventsListProps {
  eventsResponse: InfiniteData<GetAnxietyEventsResponse, AnxietyEventCursor | null>;
  hasNextPage: boolean;
}

export function UnplannedAnxietyEventsList({
  eventsResponse,
  hasNextPage,
}: UnplannedAnxietyEventsListProps) {
  const totalEvents = eventsResponse.pages.reduce(
    (count, page) => count + page.anxietyEvents.length,
    0,
  );
  if (totalEvents === 0 && !hasNextPage) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <Ghost size={42} />
        <span>No events found.</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      {eventsResponse.pages.map((page, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index}>
          {page.anxietyEvents.map((anxietyEvent) => (
            <UnplannedAnxietyEventCard key={anxietyEvent.id} anxietyEvent={anxietyEvent} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
