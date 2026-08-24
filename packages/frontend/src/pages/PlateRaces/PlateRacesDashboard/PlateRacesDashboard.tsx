import { PageWrapper } from '@/components/PageWrapper';
import { usePastPlateRaceDescriptions } from '@/hooks/queries/usePastPlateRaceDescriptions';
import { useCurrentPlateRaceDescription } from '@/hooks/queries/useCurrentPlateRaceDescription';
import { Tabs } from '@base-ui/react';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { PastPlateRaceDescriptionsList } from '@/components/Lists/PastPlateRaceDescriptionsList';
import { LoadMoreButton } from '@/components/Buttons/LoadMoreButton';
import { SvgSpinner } from '@/components/Loading/SvgSpinner';
import { CurrentPlateRaceDescriptionList } from '@/components/Lists/CurrentPlateRaceDescriptionList';

export function PlateRacesDashboard() {
  const { view } = useSearch({ from: '/MainLayout/plate-races' });
  const currentPlateRaceDescriptionQuery = useCurrentPlateRaceDescription({
    enabled: view === 'current',
  });

  const pastPlateRaceDescriptionsQuery = usePastPlateRaceDescriptions({
    enabled: view === 'past',
  });

  const navigate = useNavigate({ from: '/plate-races' });
  useEffect(() => {
    if (pastPlateRaceDescriptionsQuery.isFetchNextPageError) {
      toast.error('Failed to load more results, please try again.');
    }
  }, [pastPlateRaceDescriptionsQuery.isFetchNextPageError]);
  const isCurrentGlobalFetch = currentPlateRaceDescriptionQuery.isLoading;

  const isPastGlobalFetch =
    pastPlateRaceDescriptionsQuery.isFetching && !pastPlateRaceDescriptionsQuery.isFetchingNextPage;
  const isPastGlobalFetchError =
    pastPlateRaceDescriptionsQuery.isError && !pastPlateRaceDescriptionsQuery.isFetchNextPageError;
  return (
    <PageWrapper className="p-6 gap-6">
      <div>
        <h1 className="text-2xl font-bold font-serif">Plate Race</h1>
      </div>
      <Tabs.Root
        className="w-full flex-1 flex flex-col"
        value={view}
        onValueChange={(val: 'current' | 'past') => {
          void navigate({
            search: (prev) => ({ ...prev, view: val }),
            replace: true,
          });
        }}
      >
        <div className="flex flex-col gap-1">
          <Tabs.List className="relative flex flex-row gap-3">
            <Tabs.Tab
              value="current"
              className="text-lg text-gray-400 data-active:text-black data-active:scale-110 font-semibold transition-all duration-200 ease-in-out"
            >
              Current
            </Tabs.Tab>
            <Tabs.Tab
              value="past"
              className="text-lg text-gray-400 data-active:text-black data-active:scale-110 font-semibold transition-all duration-200 ease-in-out"
            >
              Past
            </Tabs.Tab>
          </Tabs.List>
        </div>
        <div className="flex flex-col flex-1">
          <Tabs.Panel value="current" className="flex flex-col flex-1 pt-6">
            {!isCurrentGlobalFetch && (
              <CurrentPlateRaceDescriptionList
                plateRaceDescription={currentPlateRaceDescriptionQuery.data}
              />
            )}
            {isCurrentGlobalFetch && (
              <div className="flex-1 flex flex-col justify-center items-center">
                <SvgSpinner />
              </div>
            )}
          </Tabs.Panel>
          <Tabs.Panel value="past" className="flex flex-col flex-1 pt-6 gap-6">
            {pastPlateRaceDescriptionsQuery.data && !isPastGlobalFetch && (
              <PastPlateRaceDescriptionsList
                pastPlateRaceDescriptionsResponse={pastPlateRaceDescriptionsQuery.data}
                hasNextPage={pastPlateRaceDescriptionsQuery.hasNextPage}
              />
            )}
            {isPastGlobalFetch && (
              <div className="flex-1 flex flex-col justify-center items-center">
                <SvgSpinner />
              </div>
            )}
            {!isPastGlobalFetch &&
              !isPastGlobalFetchError &&
              pastPlateRaceDescriptionsQuery.hasNextPage && (
                <LoadMoreButton
                  isFetchingNextPage={pastPlateRaceDescriptionsQuery.isFetchingNextPage}
                  onClick={() => void pastPlateRaceDescriptionsQuery.fetchNextPage()}
                />
              )}
          </Tabs.Panel>
        </div>
      </Tabs.Root>
    </PageWrapper>
  );
}
