import { PageWrapper } from '@/components/PageWrapper';
import { Input } from '@base-ui/react';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SvgSpinner } from '@/components/Loading/SvgSpinner';
import { toast } from 'sonner';
import { api } from '@/api/api';
import { BookSearchList } from '@/components/Lists/BookSearchList';

export function BooksSearch() {
  const [searchString, setSearchString] = useState('');
  const [inputVal, setInputVal] = useState('');

  const { data, isFetching, isError } = useQuery({
    queryKey: ['bookSearch', searchString],
    queryFn: ({ signal }) => api.searchBooksByQueryString({ query: searchString, signal }),
    enabled: !!searchString,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (isError) {
      toast.error('There was an error searching for books, please wait a moment and try again.');
    }
  }, [isError]);
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
      {data && !isFetching && <BookSearchList searchData={data} queryString={searchString} />}
      {isFetching && (
        <div className="flex h-full justify-center items-center flex-1">
          <SvgSpinner />
        </div>
      )}
    </PageWrapper>
  );
}
