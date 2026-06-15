import { Button } from '@base-ui/react';
import { SvgSpinner } from '@/components/Loading/SvgSpinner';

interface LoadMoreButtonProps {
  onClick: () => void;
  isFetchingNextPage: boolean;
  className?: string;
}

export function LoadMoreButton({
  onClick,
  isFetchingNextPage,
  className = '',
}: LoadMoreButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center pt-2 pb-2 ${!isFetchingNextPage && 'bg-white rounded-md shadow-sm'} ${className}`}
    >
      {isFetchingNextPage ? <SvgSpinner size="h-6 w-6" color="black" /> : 'Load More'}
    </Button>
  );
}
