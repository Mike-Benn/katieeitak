import { PageWrapper } from '@/components/PageWrapper';
import { Input } from '@base-ui/react';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { SvgSpinner } from '@/components/Loading/SvgSpinner';
import { toast } from 'sonner';
import { api } from '@/api/api';
import { BookSearchList } from '@/components/Lists/BookSearchList';
import type { GeneralBooksSearchResults } from '@katieeitak/shared';
import type { InfiniteData } from '@tanstack/react-query';
import { LoadMoreButton } from '@/components/Buttons/LoadMoreButton';

export function BooksSearch() {
  const [searchString, setSearchString] = useState('');
  const [inputVal, setInputVal] = useState('');
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isFetchNextPageError,
    isFetching,
  } = useInfiniteQuery<
    GeneralBooksSearchResults,
    Error,
    InfiniteData<GeneralBooksSearchResults, number>,
    string[],
    number
  >({
    queryKey: ['books', 'search', searchString],
    queryFn: ({ pageParam, signal }) =>
      api.searchBooksByQueryString({ query: searchString, signal, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + 20;
      if (nextOffset >= lastPage.num_found) {
        return undefined;
      }
      return nextOffset;
    },
    refetchOnWindowFocus: false,
    enabled: !!searchString,
  });

  useEffect(() => {
    if (isFetchNextPageError) {
      toast.error('Failed to load more results, please try again.');
    }
  }, [isFetchNextPageError]);
  const isGlobalFetch = isFetching && !isFetchingNextPage;
  const isGlobalFetchError = isError && !isFetchNextPageError;
  return (
    <PageWrapper className="p-6 gap-6">
      <div className="rounded-full flex flex-row bg-white items-center shadow-sm focus-within:outline focus-within:outline-blue-500 pl-3">
        <Search />
        <Input
          onValueChange={(val) => setInputVal(val)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearchString(inputVal);
              e.currentTarget.blur();
            }
          }}
          autoComplete="off"
          placeholder="Search by title"
          type="text"
          className="flex-1 pt-2 pb-2 pl-3 pr-4 outline-none"
          value={inputVal}
        />
      </div>
      {isGlobalFetch && (
        <div className="flex h-full justify-center items-center flex-1">
          <SvgSpinner />
        </div>
      )}
      {data && !isGlobalFetch && (
        <BookSearchList
          searchData={data}
          queryString={searchString}
          isGlobalFetchError={isGlobalFetchError}
        />
      )}
      {!isGlobalFetch && !isGlobalFetchError && hasNextPage && (
        <LoadMoreButton
          isFetchingNextPage={isFetchingNextPage}
          onClick={() => void fetchNextPage()}
        />
      )}
    </PageWrapper>
  );
}
