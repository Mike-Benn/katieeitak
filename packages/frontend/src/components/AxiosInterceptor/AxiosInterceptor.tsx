import { useEffect, type ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { apiClient } from '@/api/apiClient';
import { isAxiosError } from 'axios';

interface AxiosInterceptorProps {
  children: ReactNode;
}

export function AxiosInterceptor({ children }: AxiosInterceptorProps) {
  const { getAccessTokenSilently, logout } = useAuth0();

  useEffect(() => {
    const reqInterceptorId = apiClient.interceptors.request.use(
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

    const unauthorizedInterceptorId = apiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (isAxiosError(error)) {
          if (error.response?.status === 401) {
            void logout({
              logoutParams: { returnTo: window.location.origin },
            });
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      apiClient.interceptors.request.eject(reqInterceptorId);
      apiClient.interceptors.response.eject(unauthorizedInterceptorId);
    };
  }, [getAccessTokenSilently]);

  return children;
}
