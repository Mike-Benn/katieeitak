import { NavDrawer } from '@/components/Drawers/NavDrawer';
import { Link } from '@tanstack/react-router';

export function AppHeader() {
  return (
    <header className="flex flex-row justify-between items-center border-b border-lightgray py-2.5 pl-4 pr-4 bg-white">
      <div className="flex flex-row gap-4">
        <NavDrawer />
        <Link to="/" aria-label="Go to homepage">
          <img src="/app-logo.png" alt="Website logo" className="h-11.5 w-auto" />
        </Link>
      </div>
      <div></div>
    </header>
  );
}
