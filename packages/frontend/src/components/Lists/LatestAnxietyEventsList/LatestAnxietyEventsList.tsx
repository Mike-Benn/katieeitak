import { AnxietyEventCard } from '@/components/Cards/AnxietyEvent/AnxietyEventCard';
import type { GetAnxietyEventsResponse } from '@katieeitak/shared';
import type { InfiniteData } from '@tanstack/react-query';
import React from 'react';
import { Ghost } from 'lucide-react';

interface LatestAnxietyEventsListProps {
  eventsResponse: InfiniteData<GetAnxietyEventsResponse, number>;
}

export function LatestAnxietyEventsList({ eventsResponse }: LatestAnxietyEventsListProps) {
  if (eventsResponse.pages[0].num_found === 0) {
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
            <AnxietyEventCard key={anxietyEvent.id} anxietyEvent={anxietyEvent} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
