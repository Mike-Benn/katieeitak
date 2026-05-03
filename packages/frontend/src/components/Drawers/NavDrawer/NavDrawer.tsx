import { Drawer } from '@base-ui/react';
import { Menu, House, BadgeDollarSign, Leaf } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import styles from './NavDrawer.module.css';

export function NavDrawer() {
  const [open, setOpen] = useState(false);
  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger className="flex items-center">
        <Menu size={20} />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className={styles.backdrop} />
        <Drawer.Viewport className={styles.viewport}>
          <Drawer.Popup className={styles.popup}>
            <div className="flex flex-col">
              <nav>
                <ul className="list-none">
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
                </ul>
              </nav>
            </div>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
