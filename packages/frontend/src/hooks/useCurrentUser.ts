import { useAuth0 } from '@auth0/auth0-react';

export function useCurrentUser() {
  const auth = useAuth0();

  if (!auth.user) {
    throw new Error(
      'useCurrentUser was used without an authenticated user, this hook should only be used inside of a ProtectedRoute component.',
    );
  }
  return { user: auth.user };
}
