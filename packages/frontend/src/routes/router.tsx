import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { HomePage } from '@/pages/HomePage';
import { ErrorPage } from '@/pages/ErrorPage';
import { Root } from '@/components/Root';
import { MainLayout } from '@/components/Layouts/MainLayout';
import { PaycheckPage } from '@/pages/PaycheckPage';
import { AnxietyPage } from '@/pages/Anxiety/AnxietyPage';
import { NewAnxietyEventPage } from '@/pages/Anxiety/NewAnxietyEventPage';
import { BooksDashboard } from '@/pages/Books/BooksDashboard';
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

// Anxiety routes

const anxietyRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/anxiety',
  component: AnxietyPage,
});

const newAnxietyEventRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/anxiety/new',
  component: NewAnxietyEventPage,
});

// Books routes

const booksDashboardRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/books',
  component: BooksDashboard,
});

// Misc routes

const errorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/error',
  component: ErrorPage,
});

// Route trees
const protectedRouteTree = mainLayoutRoute.addChildren([
  indexRoute,
  paycheckRoute,
  anxietyRoute,
  newAnxietyEventRoute,
  booksDashboardRoute,
]);
const routeTree = rootRoute.addChildren([protectedRouteTree, errorRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
