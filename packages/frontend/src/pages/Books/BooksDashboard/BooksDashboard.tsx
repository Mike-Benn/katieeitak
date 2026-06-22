import { PageWrapper } from '@/components/PageWrapper';
import { Search, ChartBar } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { BookStatsCard } from '@/components/Cards/Books/BookStatsCard';

export function BooksDashboard() {
  return (
    <PageWrapper className="p-6 gap-6">
      <BookStatsCard />
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold">Latest</h1>
        <div className="flex flex-row gap-1">
          <Link to="/books">
            <div className="border border-muted-border p-2 rounded-md bg-muted-input shadow-md">
              <ChartBar />
            </div>
          </Link>
          <Link to="/books/search">
            <div className="border border-muted-border p-2 rounded-md bg-muted-input shadow-md">
              <Search />
            </div>
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
