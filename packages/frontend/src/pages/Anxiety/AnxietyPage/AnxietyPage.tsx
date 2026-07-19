import { PageWrapper } from '@/components/PageWrapper';
import { Link } from '@tanstack/react-router';
import { CalendarPlus } from 'lucide-react';
import { useAnxietyEvents } from '@/hooks/queries/useAnxietyEvents';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { LoadMoreButton } from '@/components/Buttons/LoadMoreButton';
import { UpcomingAnxietyEventsList } from '@/components/Lists/UpcomingAnxietyEventsList';
import { CompletedAnxietyEventsList } from '@/components/Lists/CompletedAnxietyEventList';
import { Tabs } from '@base-ui/react';

export function AnxietyPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const pendingQuery = useAnxietyEvents({ status: 'upcoming', enabled: 'upcoming' === activeTab });
  const completedQuery = useAnxietyEvents({
    status: 'completed',
    enabled: 'completed' === activeTab,
  });
  useEffect(() => {
    if (pendingQuery.isFetchNextPageError) {
      toast.error('Failed to load more results, please try again.');
    }
  }, [pendingQuery.isFetchNextPageError]);

  useEffect(() => {
    if (completedQuery.isFetchNextPageError) {
      toast.error('Failed to load more results, please try again.');
    }
  }, [completedQuery.isFetchNextPageError]);
  const isPendingGlobalFetch = pendingQuery.isFetching && !pendingQuery.isFetchingNextPage;
  const isPendingGlobalFetchError = pendingQuery.isError && !pendingQuery.isFetchNextPageError;
  const isCompletedGlobalFetch = completedQuery.isFetching && !completedQuery.isFetchingNextPage;
  const isCompletedGlobalFetchError =
    completedQuery.isError && !completedQuery.isFetchNextPageError;
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
      <Tabs.Root
        className="w-full flex-1 flex flex-col"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <Tabs.List className="relative grid grid-cols-2">
          <Tabs.Tab
            value="upcoming"
            className="pb-3 text-center text-sm text-gray-400 data-active:text-gray-900 font-bold"
          >
            Upcoming
          </Tabs.Tab>
          <Tabs.Tab
            value="completed"
            className="pb-3 text-center text-sm text-gray-400 data-active:text-gray-900 font-bold"
          >
            Completed
          </Tabs.Tab>
          <Tabs.Indicator
            className="absolute bottom-0 h-1 bg-gray-900 transition-all duration-300 ease-out rounded-full"
            style={{ left: 'var(--active-tab-left)', width: 'var(--active-tab-width)' }}
          />
        </Tabs.List>
        <div className="flex flex-col pt-6 flex-1">
          <Tabs.Panel value="upcoming" className="flex flex-col flex-1">
            <div className="flex flex-col flex-1 gap-6">
              {pendingQuery.data && !isPendingGlobalFetch && (
                <UpcomingAnxietyEventsList
                  eventsResponse={pendingQuery.data}
                  hasNextPage={pendingQuery.hasNextPage}
                />
              )}
              {!isPendingGlobalFetch && !isPendingGlobalFetchError && pendingQuery.hasNextPage && (
                <LoadMoreButton
                  isFetchingNextPage={pendingQuery.isFetchingNextPage}
                  onClick={() => void pendingQuery.fetchNextPage()}
                />
              )}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="completed" className="flex flex-col flex-1">
            <div className="flex flex-col gap-6 flex-1">
              {completedQuery.data && !isCompletedGlobalFetch && (
                <CompletedAnxietyEventsList
                  eventsResponse={completedQuery.data}
                  hasNextPage={completedQuery.hasNextPage}
                />
              )}
              {!isCompletedGlobalFetch &&
                !isCompletedGlobalFetchError &&
                completedQuery.hasNextPage && (
                  <LoadMoreButton
                    isFetchingNextPage={completedQuery.isFetchingNextPage}
                    onClick={() => void completedQuery.fetchNextPage()}
                  />
                )}
            </div>
          </Tabs.Panel>
        </div>
      </Tabs.Root>
    </PageWrapper>
  );
}
