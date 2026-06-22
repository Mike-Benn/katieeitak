import { PageWrapper } from '@/components/PageWrapper';
import { useParams } from '@tanstack/react-router';
import { SvgSpinner } from '@/components/Loading/SvgSpinner';
import { useEffect } from 'react';
import { isAxiosError } from 'axios';
import { NotFound } from '@/pages/NotFound';
import { toast } from 'sonner';
import { BookProfileCard } from '@/components/Cards/Books/BookProfileCard';
import { useBookProfile } from '@/hooks/queries/useBookProfile';
import { SaveBookDialog } from '@/components/Dialogs/SaveBookDialog';

export function BookProfile() {
  const { key } = useParams({ from: '/MainLayout/books/$key' });
  const { bookProfileQuery, markedBookProfileQuery } = useBookProfile({ bookKey: key });
  const isGlobalLoading = bookProfileQuery.isLoading || markedBookProfileQuery.isLoading;
  useEffect(() => {
    if (
      bookProfileQuery.isError &&
      isAxiosError(bookProfileQuery.error) &&
      bookProfileQuery.error.response?.status !== 404
    ) {
      toast.error(
        'There was an error loading the requested book, please wait a moment and try again.',
      );
    }
  }, [bookProfileQuery.isError]);
  if (
    bookProfileQuery.isError &&
    isAxiosError(bookProfileQuery.error) &&
    bookProfileQuery.error.response?.status === 404
  ) {
    return <NotFound />;
  }
  return (
    <PageWrapper className="p-6 gap-6">
      {isGlobalLoading && (
        <div className="flex h-full justify-center items-center flex-1">
          <SvgSpinner />
        </div>
      )}
      {!isGlobalLoading && bookProfileQuery.isSuccess && (
        <BookProfileCard bookProfile={bookProfileQuery.data} />
      )}
      {!isGlobalLoading && markedBookProfileQuery.isSuccess && bookProfileQuery.isSuccess && (
        <SaveBookDialog
          markedBookProfileData={markedBookProfileQuery.data}
          bookProfileData={bookProfileQuery.data}
        />
      )}
    </PageWrapper>
  );
}
