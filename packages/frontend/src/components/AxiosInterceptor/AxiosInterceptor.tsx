import { useEffect, type ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { apiClient } from '@/api/apiClient';

interface AxiosInterceptorProps {
  children: ReactNode;
}

export function AxiosInterceptor({ children }: AxiosInterceptorProps) {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const interceptorId = apiClient.interceptors.request.use(
      async (req) => {
        try {
          const token = await getAccessTokenSilently();
          if (token) {
            req.headers['Authorization'] = `Bearer ${token}`;
          }
        } catch (error) {
          console.error('Error fetching Auth0 token:', error);
        }
        return req;
      },
      (error) => Promise.reject(error),
    );

    return () => {
      apiClient.interceptors.request.eject(interceptorId);
    };
  }, [getAccessTokenSilently]);

  return children;
}
