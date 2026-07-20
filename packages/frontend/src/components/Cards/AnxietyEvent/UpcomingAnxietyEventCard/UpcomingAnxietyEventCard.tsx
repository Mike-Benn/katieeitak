import type { AnxietyEvent } from '@katieeitak/shared';
import { formatInTimeZone } from 'date-fns-tz';
import { type ReactNode } from 'react';
import { Smile, Meh, Frown, PartyPopper } from 'lucide-react';
import { getAnxietyEventTypeIcon } from '@/utils/getAnxietyEventTypeIcon';
import { CompleteAnxietyEventDrawer } from '@/components/Drawers/CompleteAnxietyEventDrawer';
import { EditAnxietyEventDialog } from '@/components/Dialogs/EditAnxietyEventDialog';

interface AnxietyEventCardProps {
  anxietyEvent: AnxietyEvent;
}

export function UpcomingAnxietyEventCard({ anxietyEvent }: AnxietyEventCardProps) {
  const date = anxietyEvent.date_occurred
    ? formatInTimeZone(anxietyEvent.date_occurred, 'UTC', 'MMM dd, yyyy')
    : 'Unknown';
  const anxietyIcon: ReactNode =
    anxietyEvent.pre_anxiety_level <= 3 ? (
      <Smile size={14} />
    ) : anxietyEvent.pre_anxiety_level <= 6 ? (
      <Meh size={14} />
    ) : (
      <Frown size={14} />
    );

  const typeIcon = getAnxietyEventTypeIcon({ eventType: anxietyEvent.event_type });
  return (
    <div className="flex flex-col shadow-md rounded-2xl p-6 bg-white gap-2">
      <div className="flex flex-row items-center">
        <span className="font-semibold flex-1 text-left">{anxietyEvent.title}</span>
        {date && (
          <div className="flex items-center justify-end min-w-22">
            <span className="text-gray-400 text-sm">{date}</span>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <div className="flex flex-row gap-2">
          <div className="rounded-md p-1 flex flex-row gap-1 items-center bg-muted-input shadow-sm">
            {anxietyIcon}
            <span className="text-sm">{anxietyEvent.pre_anxiety_level}</span>
          </div>
          <div className="rounded-md p-1 flex flex-row gap-1 items-center bg-muted-input shadow-sm">
            <PartyPopper size={14} />
            <span className="text-sm">{anxietyEvent.pre_excitement_level}</span>
          </div>
          <div className="rounded-md px-2 py-1 bg-muted-input shadow-sm flex items-center justify-center">
            {typeIcon}
          </div>
        </div>
        <div className="flex flex-row gap-2.5">
          <EditAnxietyEventDialog anxietyEvent={anxietyEvent} />
          <CompleteAnxietyEventDrawer anxietyEvent={anxietyEvent} />
        </div>
      </div>
    </div>
  );
}
