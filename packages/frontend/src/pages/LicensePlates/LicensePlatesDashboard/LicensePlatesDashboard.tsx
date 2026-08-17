import { PageWrapper } from '@/components/PageWrapper';
import { useTripDescriptions } from '@/hooks/queries/useTripDescriptions';
import { LicensePlatesList } from '@/components/Lists/LicensePlatesList';
import { Tabs } from '@base-ui/react';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { PlateRaceDescriptionsList } from '@/components/Lists/PlateRaceDescriptionsList';
import { LoadMoreButton } from '@/components/Buttons/LoadMoreButton';
import { SvgSpinner } from '@/components/Loading/SvgSpinner';

export function LicensePlatesDashboard() {
  const { view } = useSearch({ from: '/MainLayout/license-plates' });
  const currentTripDescriptionsQuery = useTripDescriptions({
    status: 'current',
    enabled: 'current' === view,
  });
  const pastTripDescriptionsQuery = useTripDescriptions({
    status: 'past',
    enabled: 'past' === view,
  });
  const navigate = useNavigate({ from: '/license-plates' });
  useEffect(() => {
    if (
      currentTripDescriptionsQuery.isFetchNextPageError ||
      pastTripDescriptionsQuery.isFetchNextPageError
    ) {
      toast.error('Failed to load more results, please try again.');
    }
  }, [
    currentTripDescriptionsQuery.isFetchNextPageError,
    pastTripDescriptionsQuery.isFetchNextPageError,
  ]);
  const isCurrentGlobalFetch =
    currentTripDescriptionsQuery.isFetching && !currentTripDescriptionsQuery.isFetchingNextPage;

  const isPastGlobalFetch =
    pastTripDescriptionsQuery.isFetching && !pastTripDescriptionsQuery.isFetchingNextPage;
  const isPastGlobalFetchError =
    pastTripDescriptionsQuery.isError && !pastTripDescriptionsQuery.isFetchNextPageError;

  return (
    <PageWrapper className="p-6 gap-6">
      <div>
        <h1 className="text-2xl font-bold font-serif">Trips</h1>
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
            {currentTripDescriptionsQuery.data && !isCurrentGlobalFetch && (
              <PlateRaceDescriptionsList
                plateRaceDescriptionsResponse={currentTripDescriptionsQuery.data}
                hasNextPage={currentTripDescriptionsQuery.hasNextPage}
                listType="current"
              />
            )}
            {isCurrentGlobalFetch && (
              <div className="flex-1 flex flex-col justify-center items-center">
                <SvgSpinner />
              </div>
            )}
          </Tabs.Panel>
          <Tabs.Panel value="past" className="flex flex-col flex-1 pt-6">
            {pastTripDescriptionsQuery.data && !isPastGlobalFetch && (
              <PlateRaceDescriptionsList
                plateRaceDescriptionsResponse={pastTripDescriptionsQuery.data}
                hasNextPage={pastTripDescriptionsQuery.hasNextPage}
                listType="past"
              />
            )}
            {isPastGlobalFetch && (
              <div className="flex-1 flex flex-col justify-center items-center">
                <SvgSpinner />
              </div>
            )}
          </Tabs.Panel>
        </div>
      </Tabs.Root>
    </PageWrapper>
  );
}

/*
{!currentTripQuery.isFetching && !currentTripQuery.isPending && (
              <LicensePlatesList currentTrip={currentTripQuery.data} />
            )}
*/
