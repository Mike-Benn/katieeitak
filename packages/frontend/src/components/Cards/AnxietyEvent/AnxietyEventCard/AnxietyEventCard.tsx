import { PartyPopper, Meh, Frown, Smile } from 'lucide-react';
import { formatInTimeZone } from 'date-fns-tz';
import type { ReactNode } from 'react';
import type { AnxietyEventType } from '@katieeitak/shared';
import { getAnxietyEventTypeIcon } from '@/utils/getAnxietyEventTypeIcon';
interface AnxietyEventCardProps {
  dateString?: string;
  anxietyLevel?: number;
  excitementLevel?: number;
  eventType?: AnxietyEventType;
  eventTitle?: string;
}

export function AnxietyEventCard({
  eventType,
  eventTitle = 'Unknown',
  dateString,
  anxietyLevel = -1,
  excitementLevel = -1,
}: AnxietyEventCardProps) {
  const date = dateString ? formatInTimeZone(dateString, 'UTC', 'MMM dd, yyyy') : 'Unknown';
  const anxietyIcon: ReactNode =
    anxietyLevel <= 3 ? (
      <Smile size={14} />
    ) : anxietyLevel <= 6 ? (
      <Meh size={14} />
    ) : (
      <Frown size={14} />
    );

  const typeIcon = getAnxietyEventTypeIcon({ eventType });
  return (
    <div className="flex flex-col shadow-md rounded-md p-6 bg-white gap-2">
      <div className="flex flex-row items-center">
        <span className="font-semibold flex-1">{eventTitle}</span>
        {date && (
          <div className="flex flex-rowi items-center justify-end min-w-22">
            <span className="text-gray-400 text-sm">{date}</span>
          </div>
        )}
      </div>

      <div className="flex flex-row gap-2">
        <div className="rounded-md p-1 flex flex-row gap-1 items-center bg-muted-input shadow-sm">
          {anxietyIcon}
          <span className="text-sm">{anxietyLevel}</span>
        </div>
        <div className="rounded-md p-1 flex flex-row gap-1 items-center bg-muted-input shadow-sm">
          <PartyPopper size={14} />
          <span className="text-sm">{excitementLevel}</span>
        </div>
        <div className="rounded-md pl-2 pr-2 pt-1 pb-1 bg-muted-input shadow-sm flex items-center justify-center">
          {typeIcon}
        </div>
      </div>
    </div>
  );
}
