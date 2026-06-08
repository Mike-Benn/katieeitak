import type { GeneralBooksSearchResults } from '@katieeitak/shared';
import { getBookCoverString } from '@/utils/getBookCover';
import { Ghost } from 'lucide-react';
import { Link } from '@tanstack/react-router';

interface BookSearchListProps {
  queryString: string;
  searchData: GeneralBooksSearchResults;
}

export function BookSearchList({ searchData, queryString }: BookSearchListProps) {
  if (searchData.num_found === 0) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <Ghost size={42} />
        <span className="font-semibold">No books to display</span>
      </div>
    );
  }
  const lastIndex = searchData.books.length - 1;
  return (
    <div className="flex flex-col">
      <span>
        {searchData.num_found} results for "{queryString}"
      </span>
      <ul>
        {searchData.books.map((book, index) => (
          <li
            className={`pt-5 pb-5 min-h-44 ${index !== lastIndex && 'border-b border-gray-500'}`}
            key={book.key}
          >
            <Link
              to="/books/$key"
              params={{ key: book.key.split('/works/')[1] }}
              className="visited:text-inherit no-underline flex flex-row gap-2"
            >
              <img
                src={
                  book.cover_i
                    ? getBookCoverString({
                        cover_i: book.cover_i || 1,
                        size: 'M',
                      })
                    : 'https://placehold.co/75x135?text=No+Cover'
                }
                alt="Book Cover"
                className="w-18.75 rounded-md"
              />
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold">{book.title}</h2>
                <span className="text-xs text-gray-500">
                  by {book.author_name?.[0] ?? 'Unknown Author'}
                </span>
                <div className="pt-5">
                  <span className="text-xs text-gray-500">Published {book.first_publish_year}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
