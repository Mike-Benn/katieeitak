import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { FRONTEND_ENV } from './env';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './components/App';
import { AxiosInterceptor } from './components/AxiosInterceptor';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={FRONTEND_ENV.VITE_AUTH0_DOMAIN}
      clientId={FRONTEND_ENV.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: FRONTEND_ENV.VITE_AUTH0_REDIRECT_URI,
        audience: FRONTEND_ENV.VITE_AUTH0_AUDIENCE,
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <AxiosInterceptor>
        <ProtectedRoute>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ProtectedRoute>
      </AxiosInterceptor>
    </Auth0Provider>
  </StrictMode>,
);
