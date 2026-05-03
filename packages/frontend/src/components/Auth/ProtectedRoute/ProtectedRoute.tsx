import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      void loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading) return <p>Loading...</p>;

  if (isAuthenticated) return <>{children}</>;

  return null;
}
