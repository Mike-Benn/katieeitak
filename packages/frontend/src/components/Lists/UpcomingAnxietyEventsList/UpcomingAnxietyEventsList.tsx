import type { InfiniteData } from '@tanstack/react-query';
import type { AnxietyEventCursor, GetAnxietyEventsResponse } from '@katieeitak/shared';
import { Ghost } from 'lucide-react';
import React from 'react';
import { UpcomingAnxietyEventCard } from '@/components/Cards/AnxietyEvent/UpcomingAnxietyEventCard';

interface UpcomingAnxietyEventsListProps {
  eventsResponse: InfiniteData<GetAnxietyEventsResponse, AnxietyEventCursor | null>;
}

export function UpcomingAnxietyEventsList({ eventsResponse }: UpcomingAnxietyEventsListProps) {
  if (eventsResponse.pages[0].anxietyEvents.length === 0) {
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
            <UpcomingAnxietyEventCard key={anxietyEvent.id} anxietyEvent={anxietyEvent} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
