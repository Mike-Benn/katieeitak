import { PageWrapper } from '@/components/PageWrapper';
import { Search, ChartBar } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { BookStatsCard } from '@/components/Cards/Books/BookStatsCard';
import { LatestBooksList } from '@/components/Lists/LatestBooksList';

/*
Total books
Pages read
words read
Total Genres
Average rating
<div className="flex flex-row justify-end items-center">
        <Link to="/books">
          <div className="border border-muted-border p-2 rounded-md bg-muted-input shadow-md">
            <BookPlus />
          </div>
        </Link>
      </div>

*/

export function BooksDashboard() {
  return (
    <PageWrapper className="p-6 flex flex-col gap-6">
      <BookStatsCard />
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold">Latest</h1>
        <div className="flex flex-row gap-1">
          <Link to="/books">
            <div className="border border-muted-border p-2 rounded-md bg-muted-input shadow-md">
              <ChartBar />
            </div>
          </Link>
          <Link to="/books">
            <div className="border border-muted-border p-2 rounded-md bg-muted-input shadow-md">
              <Search />
            </div>
          </Link>
        </div>
      </div>
      <LatestBooksList />
    </PageWrapper>
  );
}
