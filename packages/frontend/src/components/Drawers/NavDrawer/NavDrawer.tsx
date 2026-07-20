import { Drawer, Button } from '@base-ui/react';
import { Menu, House, BadgeDollarSign, Leaf, LogOut, BookMarked } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import styles from './NavDrawer.module.css';
import { useAuth0 } from '@auth0/auth0-react';

export function NavDrawer() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth0();
  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger className="flex items-center">
        <Menu size={30} strokeWidth={3} />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className={styles.backdrop} />
        <Drawer.Viewport className={styles.viewport}>
          <Drawer.Popup className={styles.popup}>
            <div className="h-full">
              <nav className="h-full">
                <ul className="flex flex-col list-none justify-between h-full">
                  <div>
                    <li>
                      <Link
                        to="/"
                        onClick={handleLinkClick}
                        className="nav-drawer-link visited:text-inherit"
                      >
                        <House />
                        <span>Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/paycheck"
                        onClick={handleLinkClick}
                        className="nav-drawer-link visited:text-inherit"
                      >
                        <BadgeDollarSign />
                        <span>Paycheck</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/anxiety"
                        onClick={handleLinkClick}
                        className="nav-drawer-link visited:text-inherit"
                      >
                        <Leaf />
                        <span>Anxiety</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/books"
                        onClick={handleLinkClick}
                        className="nav-drawer-link visited:text-inherit"
                      >
                        <BookMarked />
                        <span>Books</span>
                      </Link>
                    </li>
                  </div>
                  <li>
                    <Button
                      type="button"
                      onClick={() =>
                        void logout({
                          logoutParams: { returnTo: window.location.origin },
                        })
                      }
                      className="nav-drawer-link"
                    >
                      <LogOut />
                      <span>Sign out</span>
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
