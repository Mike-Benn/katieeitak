import { PartyPopper, Meh, Frown, Smile, Clock } from 'lucide-react';
import { formatInTimeZone } from 'date-fns-tz';
import type { ReactNode } from 'react';
interface AnxietyEventCardProps {
  dateString?: string;
  anxietyLevel?: number;
  excitementLevel?: number;
  eventType?: string;
}

export function AnxietyEventCard({
  eventType = 'Unknown',
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
  return (
    <div className="flex flex-col shadow-md rounded-md p-6 bg-white">
      <div className="flex flex-row justify-between items-center">
        <span className="font-semibold text-lg">{eventType}</span>
        {date && (
          <div className="flex flex-row gap-1 items-center">
            <Clock color="#d7d7d7" size={16} />
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
      </div>
    </div>
  );
}
