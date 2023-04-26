import { useState, useEffect } from 'react';
// import { getAuthenticatedUser } from './common';
// import { APP_ROUTES } from '../utils/constants';
import { getAuthUser } from '@/backend/get-auth-user.backend';
import { AuthUser } from '@/shared/models/auth-user.model';

export function useUser() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authenticated, setAutenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getUserDetails() {
      const user = await getAuthUser(); // update with token
      const isAuthenticated = user && user.username;
      if (isAuthenticated) {
        setUser(user);
        setAutenticated(true);
        // TODO: update this info into redux store, this way the credentials can be accessed via selectors
      }

      setLoading(false);
      //   Router.push(APP_ROUTES.SIGN_IN);
      return;
    }
    setLoading(true);
    getUserDetails();
  }, []);
  return { user, authenticated, loading };
}
