import { Outlet } from '@tanstack/react-router';
import { AppHeader } from '@/components/Headers/AppHeader';

export function MainLayout() {
  return (
    <>
      <AppHeader />
      <main className="flex flex-col bg-muted-bg">
        <Outlet />
      </main>
    </>
  );
}
