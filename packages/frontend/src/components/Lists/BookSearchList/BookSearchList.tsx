import type { GeneralBooksSearchResults } from '@katieeitak/shared';
import { getBookCoverString } from '@/utils/getBookCover';
import { Ghost, BotMessageSquare } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import type { InfiniteData } from '@tanstack/react-query';
import React from 'react';

interface BookSearchListProps {
  queryString: string;
  searchData: InfiniteData<GeneralBooksSearchResults, number>;
  isGlobalFetchError: boolean;
}

export function BookSearchList({
  searchData,
  queryString,
  isGlobalFetchError,
}: BookSearchListProps) {
  if (isGlobalFetchError) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <BotMessageSquare size={42} />
        <span className="font-semibold">Oops, something went wrong</span>
      </div>
    );
  }
  if (searchData.pages[0].num_found === 0) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <Ghost size={42} />
        <span className="font-semibold">No results found</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <span>
        {searchData.pages[0].num_found} results for "{queryString}"
      </span>
      <ul>
        {searchData.pages.map((page, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={index}>
            {page.books.map((book) => (
              <li className="pt-5 pb-5 min-h-44 border-b border-gray-500" key={book.key}>
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
                    className="w-18.75 rounded-md self-start"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold line-clamp-2">{book.title}</h2>
                    <span className="text-xs text-gray-500">
                      by {book.author_name?.[0] ?? 'Unknown Author'}
                    </span>
                    <div className="pt-5">
                      <span className="text-xs text-gray-500">
                        Published {book.first_publish_year}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
