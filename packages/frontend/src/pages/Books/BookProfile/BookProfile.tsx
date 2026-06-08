import { PageWrapper } from '@/components/PageWrapper';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { api } from '@/api/api';
import { SvgSpinner } from '@/components/Loading/SvgSpinner';
import { useEffect } from 'react';
import { isAxiosError } from 'axios';
import { NotFound } from '@/pages/NotFound';
import { toast } from 'sonner';
import { BookProfileCard } from '@/components/Cards/Books/BookProfileCard';

export function BookProfile() {
  const { key } = useParams({ from: '/MainLayout/books/$key' });
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ['fetchBook', key],
    queryFn: ({ signal }) => api.getBookByKey({ key, signal }),
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (isError && isAxiosError(error) && error.response?.status !== 404) {
      toast.error(
        'There was an error loading the requested book, please wait a moment and try again.',
      );
    }
  }, [isError]);
  if (isError && isAxiosError(error) && error.response?.status === 404) {
    return <NotFound />;
  }
  return (
    <PageWrapper className="p-6 gap-6">
      {isFetching && (
        <div className="flex h-full justify-center items-center flex-1">
          <SvgSpinner />
        </div>
      )}
      {data && !isFetching && <BookProfileCard bookProfile={data} />}
    </PageWrapper>
  );
}
