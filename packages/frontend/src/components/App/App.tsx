import { router } from '@/routes/router';
import { RouterProvider } from '@tanstack/react-router';
import { Toaster } from 'sonner';

export function App() {
  return (
    <>
      <Toaster />
      <div className="app-wrapper flex flex-col relative">
        <RouterProvider router={router} />
      </div>
    </>
  );
}
