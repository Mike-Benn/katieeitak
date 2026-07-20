import type { AnxietyEvent } from '@katieeitak/shared';
import { formatInTimeZone } from 'date-fns-tz';
import { getAnxietyEventTypeIcon } from '@/utils/getAnxietyEventTypeIcon';
import { CompleteAnxietyEventDrawer } from '@/components/Drawers/CompleteAnxietyEventDrawer';
import { EditAnxietyEventDialog } from '@/components/Dialogs/EditAnxietyEventDialog';
import { getAnxietyEventExcitementIcon } from '@/utils/getAnxietyEventExcitementIcon';
import { getAnxietyEventAnxietyIcon } from '@/utils/getAnxietyEventAnxietyIcon';

interface UpcomingAnxietyEventCardProps {
  anxietyEvent: AnxietyEvent;
}

export function UpcomingAnxietyEventCard({ anxietyEvent }: UpcomingAnxietyEventCardProps) {
  const date = anxietyEvent.date_occurred
    ? formatInTimeZone(anxietyEvent.date_occurred, 'UTC', 'MMM dd, yyyy')
    : 'Unknown';
  const excitementIcon = getAnxietyEventExcitementIcon({
    excitementLevel: anxietyEvent.pre_excitement_level,
    size: 14,
    status: 'pre',
  });
  const anxietyIcon = getAnxietyEventAnxietyIcon({
    anxietyLevel: anxietyEvent.pre_anxiety_level,
    size: 14,
  });
  return (
    <div className="grid grid-cols-[2.25rem_1fr] shadow-md rounded-2xl p-5 bg-white gap-4">
      <div className="flex justify-center items-center">
        {getAnxietyEventTypeIcon({ eventType: anxietyEvent.event_type, size: 36 })}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col">
          <div className="flex justify-between">
            {date && <span className="text-gray-400 text-sm">{date}</span>}
            <div className="flex flex-row gap-2.5">
              <EditAnxietyEventDialog anxietyEvent={anxietyEvent} buttonSize={18} />
              <CompleteAnxietyEventDrawer anxietyEvent={anxietyEvent} buttonSize={18} />
            </div>
          </div>
          <span className="font-semibold">{anxietyEvent.title}</span>
        </div>
        <div className="flex flex-row gap-2">
          <div className="rounded-md p-1 flex flex-row gap-1 items-center bg-muted-input shadow-sm">
            {anxietyIcon}
            <span className="text-sm">{anxietyEvent.pre_anxiety_level}</span>
          </div>
          <div className="rounded-md p-1 flex flex-row gap-1 items-center bg-muted-input shadow-sm">
            {excitementIcon}
            <span className="text-sm">{anxietyEvent.pre_excitement_level}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
