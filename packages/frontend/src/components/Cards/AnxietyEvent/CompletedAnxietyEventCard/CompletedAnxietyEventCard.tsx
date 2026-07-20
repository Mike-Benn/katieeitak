import type { AnxietyEvent } from '@katieeitak/shared';
import { formatInTimeZone } from 'date-fns-tz';
import { type ReactNode } from 'react';
import { Smile, Meh, Frown, PartyPopper } from 'lucide-react';
import { getAnxietyEventTypeIcon } from '@/utils/getAnxietyEventTypeIcon';
import { ResetAnxietyEventAlert } from '@/components/Alerts/ResetAnxietyEventAlert';
import { getAnxietyEventBorderColor } from '@/utils/getAnxietyEventBorderColor';
import { getAnxietyEventAnxietyIcon } from '@/utils/getAnxietyEventAnxietyIcon';
import { getAnxietyEventExcitementIcon } from '@/utils/getAnxietyEventExcitementIcon';

interface CompletedAnxietyEventCardProps {
  anxietyEvent: AnxietyEvent;
}

export function CompletedAnxietyEventCard({ anxietyEvent }: CompletedAnxietyEventCardProps) {
  const date = anxietyEvent.date_occurred
    ? formatInTimeZone(anxietyEvent.date_occurred, 'UTC', 'MMM dd, yyyy')
    : 'Unknown';
  const borderColorResult = getAnxietyEventBorderColor({
    anxietyLevel: anxietyEvent.post_anxiety_level,
  });
  const preAnxietyIcon = getAnxietyEventAnxietyIcon({
    anxietyLevel: anxietyEvent.pre_anxiety_level,
    size: 14,
  });
  const preExcitementIcon = getAnxietyEventExcitementIcon({
    excitementLevel: anxietyEvent.pre_excitement_level,
    size: 14,
  });
  const postExcitementIcon = getAnxietyEventExcitementIcon({
    excitementLevel: anxietyEvent.post_excitement_level,
    size: 14,
  });
  return (
    <div
      className={`grid grid-cols-[2.25rem_1fr] shadow-md rounded-2xl bg-white gap-4 ${borderColorResult ? `p-5 border-4 ${borderColorResult} ` : 'p-6'}`}
    >
      <div className="flex justify-center items-center">
        {getAnxietyEventTypeIcon({ eventType: anxietyEvent.event_type, size: 36 })}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col">
          <div className="flex justify-between">
            {date && <span className="text-gray-400 text-sm">{date}</span>}
            <div>
              <ResetAnxietyEventAlert anxietyEvent={anxietyEvent} buttonSize={18} />
            </div>
          </div>
          <span className="font-semibold">{anxietyEvent.title}</span>
        </div>
        <div className="flex flex-row gap-2">
          <div className="rounded-md p-1 flex flex-row gap-1 items-center bg-muted-input shadow-sm">
            {preAnxietyIcon}
            <span className="text-sm">{anxietyEvent.pre_anxiety_level}</span>
          </div>
          <div className="rounded-md p-1 flex flex-row gap-1 items-center bg-muted-input shadow-sm">
            {preExcitementIcon}
            <span className="text-sm">{anxietyEvent.pre_excitement_level}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
