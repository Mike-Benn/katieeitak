import { PageWrapper } from '@/components/PageWrapper';
import { SvgSpinner } from '@/components/Loading/SvgSpinner';
import { useQuery } from '@tanstack/react-query';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { api } from '@/api/api';

export function AuthPage() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const { isPending, isSuccess, error } = useQuery({
    queryKey: ['auth-complete', user.sub],
    queryFn: api.completeAuth,
  });
  useEffect(() => {
    if (!isPending) {
      if (isSuccess) {
        void navigate({ to: '/' });
      } else {
        console.log(error);
        void navigate({ to: '/error' });
      }
    }
  }, [isPending, isSuccess]);

  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center h-full">
        <SvgSpinner />
      </div>
    </PageWrapper>
  );
}
