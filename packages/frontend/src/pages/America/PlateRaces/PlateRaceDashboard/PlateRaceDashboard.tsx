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
import { Check, Clock } from 'lucide-react';

export function PlateRaceDashboard() {
  const { view } = useSearch({ from: '/MainLayout/america/plate-race' });
  const currentPlateRaceDescriptionQuery = useCurrentPlateRaceDescription({
    enabled: view === 'current',
  });

  const pastPlateRaceDescriptionsQuery = usePastPlateRaceDescriptions({
    enabled: view === 'past',
  });

  const navigate = useNavigate({ from: '/america/plate-race' });
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
    <div className="flex flex-col pt-6 gap-6">
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
              className="px-3 py-2 rounded-2xl text-center text-sm text-gray-400 bg-darkmuted-bg data-active:bg-white data-active:text-gray-900 data-active:shadow-md transition-all duration-200 font-bold flex flex-row items-center justify-center gap-1"
            >
              <Clock size={16} />
              <span>Current</span>
            </Tabs.Tab>
            <Tabs.Tab
              value="past"
              className="px-3 py-2 rounded-2xl text-center text-sm text-gray-400 bg-darkmuted-bg data-active:bg-white data-active:text-gray-900 data-active:shadow-md transition-all duration-200 font-bold flex flex-row items-center justify-center gap-1"
            >
              <Check size={16} />
              <span>Past</span>
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
    </div>
  );
}
