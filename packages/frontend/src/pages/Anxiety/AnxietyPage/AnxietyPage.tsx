import { PageWrapper } from '@/components/PageWrapper';
import { Link } from '@tanstack/react-router';
import { CalendarPlus } from 'lucide-react';
import { useAnxietyEvents } from '@/hooks/useAnxietyEvents';
import { SvgSpinner } from '@/components/Loading/SvgSpinner';
import { toast } from 'sonner';

export function AnxietyPage() {
  const { isPending, isError, isFetching, isLoading, data, error } = useAnxietyEvents();
  if (isError) {
    toast.error('There was an error fetching Anxiety Events');
  }
  if (!isFetching && !isLoading) {
    console.log(data);
  }
  return (
    <PageWrapper className="p-6 flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold">Events summary</h1>
        <Link to="/anxiety/new">
          <div className="border border-muted-border p-2 rounded-md bg-muted-input">
            <CalendarPlus />
          </div>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center border border-red-600 min-h-123">
        {(isPending || isLoading || isFetching) && <SvgSpinner size="h-16 w-16" />}
      </div>
    </PageWrapper>
  );
}
