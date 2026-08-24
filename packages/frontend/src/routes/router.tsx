import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { HomePage } from '@/pages/HomePage';
import { ErrorPage } from '@/pages/ErrorPage';
import { Root } from '@/components/Root';
import { MainLayout } from '@/components/Layouts/MainLayout';
import { PaycheckPage } from '@/pages/PaycheckPage';
import { AnxietyPage } from '@/pages/Anxiety/AnxietyPage';
import { NewAnxietyEventPage } from '@/pages/Anxiety/NewAnxietyEventPage';
import { BooksDashboard } from '@/pages/Books/BooksDashboard';
import { BooksSearch } from '@/pages/Books/BooksSearch';
import { BookProfile } from '@/pages/Books/BookProfile';
import { z } from 'zod';
import { PlateRaceProfile } from '@/pages/PlateRaces/PlateRaceProfile';
import { PlateRacesDashboard } from '@/pages/PlateRaces/PlateRacesDashboard';

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

export const anxietyRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/anxiety',
  component: AnxietyPage,
  validateSearch: z.object({
    initialOccurrence: z.enum(['expected', 'unplanned']).optional(),
  }),
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

const booksSearchRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/books/search',
  component: BooksSearch,
});

const bookProfileRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/books/$key',
  component: BookProfile,
});

// Plate races

const plateRaceDashboardViewSchema = z.object({
  view: z.enum(['current', 'past']).default('current').catch('current'),
});

const plateRaceDashboardRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/plate-races',
  component: PlateRacesDashboard,
  validateSearch: plateRaceDashboardViewSchema,
});

const plateRaceProfileRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/plate-races/$id',
  component: PlateRaceProfile,
});

// America routes

const americaDashboardRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/america',
  component: AmericaDashboard,
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
  booksSearchRoute,
  bookProfileRoute,
  plateRaceDashboardRoute,
  plateRaceProfileRoute,
  americaDashboardRoute,
]);
const routeTree = rootRoute.addChildren([protectedRouteTree, errorRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

import type { RegisteredRouter } from '@tanstack/react-router';
import { AmericaDashboard } from '@/pages/America/AmericaDashboard';
export type AppRoutePath = keyof RegisteredRouter['routesByPath'];
