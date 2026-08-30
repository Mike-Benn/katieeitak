import { PageWrapper } from '@/components/PageWrapper';
import { BadgeDollarSign, Leaf, BookMarked, Plane } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export function HomePage() {
  return (
    <PageWrapper>
      <div className="grid grid-cols-2 gap-4 p-6">
        <Link
          to="/paycheck"
          className="no-underline visited:text-inherit flex flex-col bg-white aspect-square justify-center items-center shadow-md rounded-2xl p-6 gap-2"
        >
          <BadgeDollarSign size={36} />
          <span className="font-semibold text-lg text-center line-clamp-1">Paycheck</span>
        </Link>
        <Link
          to="/anxiety"
          className="no-underline visited:text-inherit flex flex-col bg-white aspect-square justify-center items-center shadow-md rounded-2xl p-6 gap-2"
        >
          <Leaf size={36} />
          <span className="font-semibold text-lg text-center line-clamp-1">Anxiety</span>
        </Link>
        <Link
          to="/books"
          className="no-underline visited:text-inherit flex flex-col bg-white aspect-square justify-center items-center shadow-md rounded-2xl p-6 gap-2"
        >
          <BookMarked size={36} />
          <span className="font-semibold text-lg text-center line-clamp-1">Books</span>
        </Link>
        <Link
          to="/america"
          className="no-underline visited:text-inherit flex flex-col bg-white aspect-square justify-center items-center shadow-md rounded-2xl p-6 gap-2"
        >
          <Plane size={36} />
          <span className="font-semibold text-lg text-center line-clamp-1">America</span>
        </Link>
      </div>
    </PageWrapper>
  );
}
