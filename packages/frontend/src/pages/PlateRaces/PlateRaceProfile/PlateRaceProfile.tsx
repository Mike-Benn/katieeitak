import { usePlateRaceData } from '@/hooks/queries/usePlateRaceData';
import { useParams } from '@tanstack/react-router';
import { PageWrapper } from '@/components/PageWrapper';
import { LicensePlatesList } from '@/components/Lists/LicensePlatesList';
import { MissingResourcePage } from '@/pages/MissingResourcePage/MissingResourcePage';
import { isAxiosError } from 'axios';
import { SvgSpinner } from '@/components/Loading/SvgSpinner';

export function PlateRaceProfile() {
  const { id } = useParams({ from: '/MainLayout/plate-races/$id' });
  const plateRaceQuery = usePlateRaceData({ plateRaceId: id });

  if (
    !plateRaceQuery.isFetching &&
    plateRaceQuery.isError &&
    isAxiosError(plateRaceQuery.error) &&
    plateRaceQuery.error.status === 404
  ) {
    return <MissingResourcePage backTo="/plate-races" />;
  }
  return (
    <PageWrapper className="p-6 gap-6">
      {!plateRaceQuery.isFetching && <LicensePlatesList plateRaceData={plateRaceQuery.data} />}
      {plateRaceQuery.isFetching && (
        <div className="flex-1 flex flex-col justify-center items-center">
          <SvgSpinner />
        </div>
      )}
    </PageWrapper>
  );
}
