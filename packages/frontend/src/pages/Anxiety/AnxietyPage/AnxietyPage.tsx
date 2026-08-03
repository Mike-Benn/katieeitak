import { PageWrapper } from '@/components/PageWrapper';
import { Link } from '@tanstack/react-router';
import { CalendarPlus, Clock, Check } from 'lucide-react';
import { useAnxietyEvents } from '@/hooks/queries/useAnxietyEvents';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { LoadMoreButton } from '@/components/Buttons/LoadMoreButton';
import { UpcomingAnxietyEventsList } from '@/components/Lists/UpcomingAnxietyEventsList';
import { CompletedAnxietyEventsList } from '@/components/Lists/CompletedAnxietyEventsList';
import { Tabs } from '@base-ui/react';
import { UnplannedAnxietyEventsList } from '@/components/Lists/UnplannedAnxietyEventsList';
import { anxietyRoute } from '@/routes/router';

export function AnxietyPage() {
  const { initialOccurrence } = anxietyRoute.useSearch();
  const [expectedActiveStatusTab, setExpectedActiveStatusTab] = useState<'upcoming' | 'completed'>(
    'upcoming',
  );
  const [activeOccurrenceTypeTab, setActiveOccurrenceTypeTab] = useState<'expected' | 'unplanned'>(
    initialOccurrence ?? 'expected',
  );
  const [unplannedActiveStatusTab, setUnplannedActiveStatusTab] =
    useState<'completed'>('completed');
  const pendingQuery = useAnxietyEvents({
    status: 'upcoming',
    enabled: 'upcoming' === expectedActiveStatusTab && activeOccurrenceTypeTab === 'expected',
    occurrenceType: 'expected',
  });
  const completedQuery = useAnxietyEvents({
    status: 'completed',
    enabled: 'completed' === expectedActiveStatusTab && activeOccurrenceTypeTab === 'expected',
    occurrenceType: 'expected',
  });
  const unplannedQuery = useAnxietyEvents({
    status: 'completed',
    enabled: activeOccurrenceTypeTab === 'unplanned',
    occurrenceType: 'unplanned',
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
  const isUnplannedGlobalFetch = unplannedQuery.isFetching && !unplannedQuery.isFetchingNextPage;
  const isUnplannedGlobalFetchError =
    unplannedQuery.isError && !unplannedQuery.isFetchNextPageError;
  return (
    <PageWrapper className="p-6 gap-6">
      <div>
        <h1 className="text-2xl font-bold font-serif">Anxiety Events</h1>
      </div>
      <Tabs.Root
        className="w-full flex-1 flex flex-col"
        value={activeOccurrenceTypeTab}
        onValueChange={setActiveOccurrenceTypeTab}
      >
        <div className="flex flex-row justify-between">
          <Tabs.List className="relative flex flex-row gap-3">
            <Tabs.Tab
              value="expected"
              className="text-lg text-gray-400 data-active:text-black data-active:scale-110 font-semibold transition-all duration-200 ease-in-out"
            >
              Expected
            </Tabs.Tab>
            <Tabs.Tab
              value="unplanned"
              className="text-lg text-gray-400 data-active:text-black data-active:scale-110 font-semibold transition-all duration-200 ease-in-out"
            >
              Unplanned
            </Tabs.Tab>
          </Tabs.List>
          <Link to="/anxiety/new">
            <div className="border border-muted-border p-2 rounded-md bg-muted-input shadow-md">
              <CalendarPlus />
            </div>
          </Link>
        </div>
        <div className="flex flex-col pt-6 flex-1">
          <Tabs.Panel value="expected" className="flex flex-col flex-1">
            <Tabs.Root
              className="w-full flex-1 flex flex-col"
              value={expectedActiveStatusTab}
              onValueChange={setExpectedActiveStatusTab}
            >
              <Tabs.List className="relative flex flex-row gap-3">
                <Tabs.Tab
                  value="upcoming"
                  className="px-3 py-2 rounded-2xl text-center text-sm text-gray-400 bg-darkmuted-bg data-active:bg-white data-active:text-gray-900 data-active:shadow-md transition-all duration-200 font-bold flex flex-row items-center justify-center gap-1"
                >
                  <Clock size={16} />
                  <span>Upcoming</span>
                </Tabs.Tab>
                <Tabs.Tab
                  value="completed"
                  className="px-3 py-2 rounded-2xl text-center text-sm text-gray-400 bg-darkmuted-bg data-active:bg-white data-active:text-gray-900 data-active:shadow-md transition-all duration-200 font-bold flex flex-row items-center justify-center gap-1"
                >
                  <Check size={16} />
                  <span>Past</span>
                </Tabs.Tab>
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
                    {!isPendingGlobalFetch &&
                      !isPendingGlobalFetchError &&
                      pendingQuery.hasNextPage && (
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
          </Tabs.Panel>
          <Tabs.Panel value="unplanned" className="flex flex-col flex-1">
            <Tabs.Root
              className="w-full flex-1 flex flex-col"
              value={unplannedActiveStatusTab}
              onValueChange={setUnplannedActiveStatusTab}
            >
              <Tabs.List className="relative flex">
                <Tabs.Tab
                  value="completed"
                  className="px-3 py-2 rounded-2xl text-center text-sm text-gray-400 bg-darkmuted-bg data-active:bg-white data-active:text-gray-900 data-active:shadow-md transition-all duration-200 font-bold flex flex-row items-center justify-center gap-1"
                >
                  <Check size={16} />
                  <span>Past</span>
                </Tabs.Tab>
              </Tabs.List>
              <div className="flex flex-col pt-6 flex-1">
                <Tabs.Panel value="completed" className="flex flex-col flex-1">
                  <div className="flex flex-col gap-6 flex-1">
                    {unplannedQuery.data && !isUnplannedGlobalFetch && (
                      <UnplannedAnxietyEventsList
                        eventsResponse={unplannedQuery.data}
                        hasNextPage={unplannedQuery.hasNextPage}
                      />
                    )}
                    {!isUnplannedGlobalFetch &&
                      !isUnplannedGlobalFetchError &&
                      unplannedQuery.hasNextPage && (
                        <LoadMoreButton
                          isFetchingNextPage={unplannedQuery.isFetchingNextPage}
                          onClick={() => void unplannedQuery.fetchNextPage()}
                        />
                      )}
                  </div>
                </Tabs.Panel>
              </div>
            </Tabs.Root>
          </Tabs.Panel>
        </div>
      </Tabs.Root>
    </PageWrapper>
  );
}
