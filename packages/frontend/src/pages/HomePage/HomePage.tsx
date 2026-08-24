import { PageWrapper } from '@/components/PageWrapper';
import { BadgeDollarSign, Leaf, BookMarked, Car } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export function HomePage() {
  return (
    <PageWrapper className="p-6">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4 justify-center">
        <Link
          to="/paycheck"
          className="no-underline visited:text-inherit flex flex-col bg-white aspect-square justify-center items-center shadow-md rounded-2xl p-6 gap-2"
        >
          <BadgeDollarSign size={36} />
          <span className="font-semibold text-lg">Paycheck</span>
        </Link>
        <Link
          to="/anxiety"
          className="no-underline visited:text-inherit flex flex-col bg-white aspect-square justify-center items-center shadow-md rounded-2xl p-6 gap-2"
        >
          <Leaf size={36} />
          <span className="font-semibold text-lg">Anxiety</span>
        </Link>
        <Link
          to="/books"
          className="no-underline visited:text-inherit flex flex-col bg-white aspect-square justify-center items-center shadow-md rounded-2xl p-6 gap-2"
        >
          <BookMarked size={36} />
          <span className="font-semibold text-lg">Books</span>
        </Link>
        <Link
          to="/plate-races"
          className="no-underline visited:text-inherit flex flex-col bg-white aspect-square justify-center items-center shadow-md rounded-2xl p-6 gap-2"
        >
          <Car size={36} />
          <span className="font-semibold text-lg text-center">Plate races</span>
        </Link>
      </div>
    </PageWrapper>
  );
}
