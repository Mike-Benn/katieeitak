import { router } from '@/routes/router';
import { RouterProvider } from '@tanstack/react-router';

export function App() {
  return (
    <div className="app-wrapper flex flex-col h-full relative">
      <RouterProvider router={router} />
    </div>
  );
}
