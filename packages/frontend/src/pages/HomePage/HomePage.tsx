import { PageWrapper } from '@/components/PageWrapper';
import { BadgeDollarSign, Leaf } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export function HomePage() {
  return (
    <PageWrapper className="p-6 min-h-[calc(100dvh-var(--nav-height))]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4 justify-center">
        <Link
          to="/paycheck"
          className="no-underline visited:text-inherit flex flex-col bg-white aspect-square justify-center items-center shadow-md rounded-md p-6 gap-2"
        >
          <BadgeDollarSign size={36} />
          <span className="font-semibold text-lg">Paycheck</span>
        </Link>
        <Link
          to="/anxiety"
          className="no-underline visited:text-inherit flex flex-col bg-white aspect-square justify-center items-center shadow-md rounded-md p-6 gap-2"
        >
          <Leaf size={36} />
          <span className="font-semibold text-lg">Anxiety</span>
        </Link>
      </div>
    </PageWrapper>
  );
}
