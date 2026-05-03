import { Outlet } from '@tanstack/react-router';
import { CompleteAuth } from '@/components/Auth/CompleteAuth';
export function Root() {
  return (
    <CompleteAuth>
      <Outlet />
    </CompleteAuth>
  );
}
