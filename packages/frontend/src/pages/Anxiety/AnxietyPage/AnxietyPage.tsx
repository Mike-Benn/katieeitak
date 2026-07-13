import { PageWrapper } from '@/components/PageWrapper';
import { Link } from '@tanstack/react-router';
import { CalendarPlus } from 'lucide-react';
import { useAnxietyEvents } from '@/hooks/queries/useAnxietyEvents';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { LoadMoreButton } from '@/components/Buttons/LoadMoreButton';
import { UpcomingAnxietyEventsList } from '@/components/Lists/UpcomingAnxietyEventsList';
import { Tabs } from '@base-ui/react';

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
  return (
    <PageWrapper className="p-6 gap-6">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Anxiety Events</h1>
        <Link to="/anxiety/new">
          <div className="border border-muted-border p-2 rounded-md bg-muted-input shadow-md">
            <CalendarPlus />
          </div>
        </Link>
      </div>
      <Tabs.Root className="w-full" defaultValue="upcoming">
        <Tabs.List className="relative grid grid-cols-2">
          <Tabs.Tab
            value="upcoming"
            className="pb-3 text-center text-sm text-gray-400 data-active:text-gray-900 font-bold"
          >
            Upcoming
          </Tabs.Tab>
          <Tabs.Tab
            value="past"
            className="pb-3 text-center text-sm text-gray-400 data-active:text-gray-900 font-bold"
          >
            Past
          </Tabs.Tab>
          <Tabs.Indicator
            className="absolute bottom-0 h-1 bg-gray-900 transition-all duration-300 ease-out rounded-full"
            style={{ left: 'var(--active-tab-left)', width: 'var(--active-tab-width)' }}
          />
        </Tabs.List>
        <div className="flex flex-col pt-6">
          <Tabs.Panel value="upcoming">
            <div className="flex flex-col gap-6">
              {data && !isGlobalFetch && <UpcomingAnxietyEventsList eventsResponse={data} />}
              {!isGlobalFetch && !isGlobalFetchError && hasNextPage && (
                <LoadMoreButton
                  isFetchingNextPage={isFetchingNextPage}
                  onClick={() => void fetchNextPage()}
                />
              )}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="past">
            <p>Past</p>
          </Tabs.Panel>
        </div>
      </Tabs.Root>
    </PageWrapper>
  );
}
