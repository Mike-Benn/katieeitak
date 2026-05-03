import { router } from '@/routes/router';
import { RouterProvider } from '@tanstack/react-router';

export function App() {
  return <RouterProvider router={router} />;
}
