import { useAuth0 } from '@auth0/auth0-react';

export function LogoutButton() {
  const { logout } = useAuth0();
  const handleLogout = () => {
    void logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };
  return <button onClick={handleLogout}>Logout</button>;
}
