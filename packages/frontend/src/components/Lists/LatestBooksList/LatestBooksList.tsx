import { Ghost } from 'lucide-react';
import { PageWrapper } from '@/components/PageWrapper';

export function LatestBooksList() {
  const books = [];

  if (books.length === 0) {
    return (
      <div className="flex flex-col bg-white shadow-md rounded-md h-full justify-center items-center flex-1 gap-2">
        <Ghost size={40} />
        <span className="font-semibold">No books to display</span>
      </div>
    );
  }

  return (
    <PageWrapper>
      <span>Todo</span>
    </PageWrapper>
  );
}
