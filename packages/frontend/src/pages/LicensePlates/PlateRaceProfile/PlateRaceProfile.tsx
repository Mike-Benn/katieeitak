import { useTripData } from '@/hooks/queries/useTripData';
import { useParams } from '@tanstack/react-router';
import { PageWrapper } from '@/components/PageWrapper';
import { LicensePlatesList } from '@/components/Lists/LicensePlatesList';
import { MissingResourcePage } from '@/pages/MissingResourcePage/MissingResourcePage';
import { isAxiosError } from 'axios';

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
    </PageWrapper>
  );
}
