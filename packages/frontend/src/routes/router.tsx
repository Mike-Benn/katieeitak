import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { HomePage } from '@/pages/HomePage';
import { ErrorPage } from '@/pages/ErrorPage';
import { Root } from '@/components/Root';
import { MainLayout } from '@/components/Layouts/MainLayout';
import { PaycheckPage } from '@/pages/PaycheckPage';
const rootRoute = createRootRoute({
  component: Root,
});

// Protected routes

const mainLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'MainLayout',
  component: MainLayout,
});

// Home routes

const indexRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/',
  component: HomePage,
});

// Paycheck routes

const paycheckRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/paycheck',
  component: PaycheckPage,
});

// Misc routes

const errorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/error',
  component: ErrorPage,
});

// Route trees
const protectedRouteTree = mainLayoutRoute.addChildren([indexRoute, paycheckRoute]);
const routeTree = rootRoute.addChildren([protectedRouteTree, errorRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
