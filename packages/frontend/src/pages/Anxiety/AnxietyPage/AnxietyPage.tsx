import { PageWrapper } from '@/components/PageWrapper';
import { Link } from '@tanstack/react-router';
import { CalendarPlus } from 'lucide-react';
import { useAnxietyEvents } from '@/hooks/queries/useAnxietyEvents';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { LatestAnxietyEventsList } from '@/components/Lists/LatestAnxietyEventsList';
import { SvgSpinner } from '@/components/Loading/SvgSpinner';
import { LoadMoreButton } from '@/components/Buttons/LoadMoreButton';

export function AnxietyPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isFetchNextPageError,
    isFetching,
  } = useAnxietyEvents();

  useEffect(() => {
    if (isFetchNextPageError) {
      toast.error('Failed to load more results, please try again.');
    }
  }, [isFetchNextPageError]);
  const isGlobalFetch = isFetching && !isFetchingNextPage;
  const isGlobalFetchError = isError && !isFetchNextPageError;
  console.log(data);
  return (
    <PageWrapper className="p-6 flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold">Events summary</h1>
        <Link to="/anxiety/new">
          <div className="border border-muted-border p-2 rounded-md bg-muted-input shadow-md">
            <CalendarPlus />
          </div>
        </Link>
      </div>
      {isGlobalFetch && (
        <div className="flex justify-center items-center flex-1">
          <SvgSpinner />
        </div>
      )}
      {data && !isGlobalFetch && <LatestAnxietyEventsList eventsResponse={data} />}
      {!isGlobalFetch && !isGlobalFetchError && hasNextPage && (
        <LoadMoreButton
          isFetchingNextPage={isFetchingNextPage}
          onClick={() => void fetchNextPage()}
        />
      )}
    </PageWrapper>
  );
}
