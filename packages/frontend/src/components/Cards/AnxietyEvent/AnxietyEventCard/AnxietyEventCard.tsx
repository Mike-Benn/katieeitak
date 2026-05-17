import { PartyPopper, Meh, Clock } from 'lucide-react';

interface AnxietyEventCardProps {
  date?: string;
  anxietyLevel?: number;
  excitementLevel?: number;
  eventType?: string;
}

export function AnxietyEventCard({
  eventType = 'Unknown',
  date = 'Unknown',
  anxietyLevel = -1,
  excitementLevel = -1,
}: AnxietyEventCardProps) {
  return (
    <div className="flex flex-col shadow-md rounded-md p-6">
      <div className="flex flex-row justify-between items-center">
        <span className="font-semibold text-lg">{eventType}</span>
        <div className="flex flex-row gap-1 items-center">
          <Clock color="#d7d7d7" size={16} />
          <span className="text-gray-400 text-sm">{date}</span>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="rounded-md p-1 flex flex-row gap-1 items-center bg-muted-input shadow-sm">
          <Meh size={14} />
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
