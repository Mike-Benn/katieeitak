import { PageWrapper } from '@/components/PageWrapper';
import { Link } from '@tanstack/react-router';
import { CalendarPlus } from 'lucide-react';
import { AnxietyEventCardWrapper } from '@/components/Cards/AnxietyEvent/AnxietyEventCardWrapper';

export function AnxietyPage() {
  return (
    <PageWrapper className="p-6 flex flex-col min-h-[calc(100dvh-var(--nav-height))] gap-6 bg-muted-bg">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold">Events summary</h1>
        <Link to="/anxiety/new">
          <div className="border border-muted-border p-2 rounded-md bg-muted-input shadow-md">
            <CalendarPlus />
          </div>
        </Link>
      </div>
      <AnxietyEventCardWrapper />
    </PageWrapper>
  );
}
