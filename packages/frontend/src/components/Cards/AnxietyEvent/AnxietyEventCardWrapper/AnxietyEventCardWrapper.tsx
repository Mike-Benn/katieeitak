import { useAnxietyEvents } from '@/hooks/useAnxietyEvents';
import { toast } from 'sonner';
import { SvgSpinner } from '@/components/Loading/SvgSpinner';
import { Ghost } from 'lucide-react';
import { AnxietyEventCard } from '@/components/Cards/AnxietyEvent/AnxietyEventCard/AnxietyEventCard';

export function AnxietyEventCardWrapper() {
  const { isPending, isError, isFetching, isLoading, isSuccess, data } = useAnxietyEvents();
  if (isError) {
    toast.error('There was an error fetching Anxiety Events');
  }

  const isContentReady = !isPending && !isLoading && !isFetching;

  if (!isContentReady) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center bg-white">
        <SvgSpinner size="h-16 w-16" />
      </div>
    );
  }

  if (isSuccess && data.length < 1) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <Ghost size={42} />
        <span>No events found.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 gap-6">
      {isSuccess && data.map((event) => <AnxietyEventCard key={event.id} anxietyEvent={event} />)}
    </div>
  );
}
