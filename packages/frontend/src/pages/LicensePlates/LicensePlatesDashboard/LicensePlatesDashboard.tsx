import { PageWrapper } from '@/components/PageWrapper';
import { useCurrentTrip } from '@/hooks/queries/useCurrentTrip';
import { LicensePlatesList } from '@/components/Lists/LicensePlatesList';
import { Tabs } from '@base-ui/react';

export function LicensePlatesDashboard() {
  const currentTripQuery = useCurrentTrip();
  return (
    <PageWrapper className="p-6 gap-6">
      <div>
        <h1 className="text-2xl font-bold font-serif">Trips</h1>
      </div>
      <Tabs.Root className="w-full flex-1 flex flex-col" defaultValue="current">
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
          <Tabs.Panel value="current" className="flex flex-col flex-1 pt-2">
            {!currentTripQuery.isFetching && !currentTripQuery.isPending && (
              <LicensePlatesList currentTrip={currentTripQuery.data} />
            )}
          </Tabs.Panel>
          <Tabs.Panel value="past" className="flex flex-col flex-1">
            <p>TODO</p>
          </Tabs.Panel>
        </div>
      </Tabs.Root>
    </PageWrapper>
  );
}
