import { Outlet } from '@tanstack/react-router';
import { AppHeader } from '@/components/Headers/AppHeader';

export function MainLayout() {
  return (
    <>
      <AppHeader />
      <main className="min-h-full flex flex-col">
        <Outlet />
      </main>
    </>
  );
}
