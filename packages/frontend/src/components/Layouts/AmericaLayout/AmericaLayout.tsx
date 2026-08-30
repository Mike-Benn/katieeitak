import { PageWrapper } from '@/components/PageWrapper';
import { Tabs } from '@base-ui/react';
import { MapPinCheck, Car } from 'lucide-react';
import { Outlet, useLocation, useNavigate } from '@tanstack/react-router';

export function AmericaLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.includes('states') ? 'states' : 'plate-race';

  const handleTabChange = (value: string) => {
    void navigate({ to: `/america/${value}` });
  };

  return (
    <PageWrapper className="p-6 gap-6">
      <div>
        <h1 className="text-2xl font-bold font-serif">America</h1>
      </div>

      <Tabs.Root
        className="w-full flex-1 flex flex-col"
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <div className="flex flex-col gap-1">
          <Tabs.List className="relative flex flex-row gap-4 pb-2">
            <Tabs.Tab
              value="states"
              className="text-gray-400 data-active:text-black font-semibold transition-colors duration-200 ease-in-out hover:text-gray-600"
            >
              <div className="flex flex-col items-center justify-center gap-1 px-2">
                <MapPinCheck size={30} />
                <span className="text-sm">State Chase</span>
              </div>
            </Tabs.Tab>

            <Tabs.Tab
              value="plate-race"
              className="text-gray-400 data-active:text-black font-semibold transition-colors duration-200 ease-in-out hover:text-gray-600"
            >
              <div className="flex flex-col items-center justify-center gap-1 px-2">
                <Car size={30} />
                <span className="text-sm">Plate Race</span>
              </div>
            </Tabs.Tab>

            <Tabs.Indicator
              className="absolute bottom-0 h-0.5 bg-gray-900 transition-all duration-300 ease-out rounded-full"
              style={{
                left: 'var(--active-tab-left)',
                width: 'var(--active-tab-width)',
              }}
            />
          </Tabs.List>
        </div>

        <div className="flex flex-col flex-1">
          <Outlet />
        </div>
      </Tabs.Root>
    </PageWrapper>
  );
}
