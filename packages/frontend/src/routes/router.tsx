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
import { LicensePlatesDashboard } from '@/pages/LicensePlates/LicensePlatesDashboard';
import { z } from 'zod';
import { PlateRaceProfile } from '@/pages/LicensePlates/PlateRaceProfile';
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

// License plates

const licensePlateDashboardViewSchema = z.object({
  view: z.enum(['current', 'past']).default('current').catch('current'),
});

const licensePlatesDashboardRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/license-plates',
  component: LicensePlatesDashboard,
  validateSearch: licensePlateDashboardViewSchema,
});

const plateRaceProfileRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/license-plates/$id',
  component: PlateRaceProfile,
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
  licensePlatesDashboardRoute,
  plateRaceProfileRoute,
]);
const routeTree = rootRoute.addChildren([protectedRouteTree, errorRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

import type { RegisteredRouter } from '@tanstack/react-router';
export type AppRoutePath = keyof RegisteredRouter['routesByPath'];
