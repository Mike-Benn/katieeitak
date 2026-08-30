import { usePlateRaceData } from '@/hooks/queries/usePlateRaceData';
import { useParams, Link } from '@tanstack/react-router';
import { LicensePlatesList } from '@/components/Lists/LicensePlatesList';
import { MissingResourcePage } from '@/pages/MissingResourcePage/MissingResourcePage';
import { isAxiosError } from 'axios';
import { SvgSpinner } from '@/components/Loading/SvgSpinner';
import { ChevronLeft } from 'lucide-react';

export function PlateRaceProfile() {
  const { id } = useParams({ from: '/MainLayout/america/plate-race/$id' });
  const plateRaceQuery = usePlateRaceData({ plateRaceId: id });

  if (
    !plateRaceQuery.isFetching &&
    plateRaceQuery.isError &&
    isAxiosError(plateRaceQuery.error) &&
    plateRaceQuery.error.status === 404
  ) {
    return <MissingResourcePage backTo="/america/plate-race" />;
  }
  return (
    <div className="pt-6 flex flex-col gap-4">
      {!plateRaceQuery.isFetching && (
        <>
          <Link
            to="/america/plate-race"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 font-medium w-fit transition-colors"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
            Back to races
          </Link>

          <LicensePlatesList plateRaceData={plateRaceQuery.data} />
        </>
      )}

      {plateRaceQuery.isFetching && (
        <div className="flex-1 flex flex-col justify-center items-center">
          <SvgSpinner />
        </div>
      )}
    </div>
  );
}
