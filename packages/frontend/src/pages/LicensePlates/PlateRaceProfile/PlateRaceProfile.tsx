import { useTripData } from '@/hooks/queries/useTripData';
import { useParams } from '@tanstack/react-router';
import { PageWrapper } from '@/components/PageWrapper';
import { LicensePlatesList } from '@/components/Lists/LicensePlatesList';
import { MissingResourcePage } from '@/pages/MissingResourcePage/MissingResourcePage';
import { isAxiosError } from 'axios';
import { SvgSpinner } from '@/components/Loading/SvgSpinner';

export function PlateRaceProfile() {
  const { id } = useParams({ from: '/MainLayout/license-plates/$id' });
  const tripQuery = useTripData({ tripId: id });

  if (
    !tripQuery.isFetching &&
    tripQuery.isError &&
    isAxiosError(tripQuery.error) &&
    tripQuery.error.status === 404
  ) {
    return <MissingResourcePage backTo="/license-plates" />;
  }
  return (
    <PageWrapper className="p-6 gap-6">
      {!tripQuery.isFetching && <LicensePlatesList tripData={tripQuery.data} />}
      {tripQuery.isFetching && (
        <div className="flex-1 flex flex-col justify-center items-center">
          <SvgSpinner />
        </div>
      )}
    </PageWrapper>
  );
}
