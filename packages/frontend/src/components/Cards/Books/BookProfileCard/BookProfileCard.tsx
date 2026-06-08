import { getBookCoverString } from '@/utils/getBookCover';
import type { DetailedBookResponse } from '@katieeitak/shared';
import { getBookDescription } from '@/utils/getBookDescription';
import ReactMarkdown from 'react-markdown';

interface BookProfileCardProps {
  bookProfile: DetailedBookResponse;
}

export function BookProfileCard({ bookProfile }: BookProfileCardProps) {
  const coverKey =
    bookProfile.book.covers && bookProfile.book.covers[0] ? bookProfile.book.covers[0] : undefined;
  const src = coverKey ? getBookCoverString({ cover_i: coverKey, size: 'L' }) : undefined;
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-[35%] aspect-2/3">
        <img
          src={src ?? 'https://placehold.co/400x600?text=No+Cover'}
          alt="Book Cover"
          className="rounded-md h-full w-full"
        />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold">{bookProfile.book.title || 'Unknown Title'}</h2>
        <span className="text-gray-500">{bookProfile.author_name || 'Unknown Author'}</span>
      </div>
      <ReactMarkdown>
        {bookProfile.book.description
          ? getBookDescription({ description: bookProfile.book.description })
          : 'No description available'}
      </ReactMarkdown>
    </div>
  );
}
