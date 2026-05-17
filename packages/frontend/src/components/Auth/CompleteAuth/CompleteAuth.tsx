import { useEffect, type ReactNode } from 'react';
import { useStore } from '@/hooks/useStore';
import { PageWrapper } from '@/components/PageWrapper';
import { SvgSpinner } from '@/components/Loading/SvgSpinner';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { api } from '@/api/api';

interface CompleteAuthProps {
  children: ReactNode;
}

export function CompleteAuth({ children }: CompleteAuthProps) {
  const navigate = useNavigate();
  const { isComplete, setIsComplete, setUser } = useStore();

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ['auth-complete'],
    queryFn: ({ signal }) => api.completeAuth(signal),
  });

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
      setIsComplete(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      void navigate({ to: '/error', replace: true });
    }
  }, [isError]);

  if (!isComplete)
    return (
      <PageWrapper>
        <div className="flex flex-col justify-center items-center min-h-dvh">
          <SvgSpinner />
        </div>
      </PageWrapper>
    );
  return <>{children}</>;
}
