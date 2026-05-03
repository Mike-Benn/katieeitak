import { CircleUserRound } from 'lucide-react';
import { NavDrawer } from '@/components/Drawers/NavDrawer';

export function AppHeader() {
  return (
    <header className="flex flex-row justify-between items-center border-b border-lightgray p-4 pl-4 pr-4">
      <div className="flex flex-row gap-2">
        <NavDrawer />
        <h1>Katieeitak</h1>
      </div>
      <div>
        <CircleUserRound size={20} />
      </div>
    </header>
  );
}
