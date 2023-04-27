import { useState, useEffect } from 'react';
// import { getAuthenticatedUser } from './common';
// import { APP_ROUTES } from '../utils/constants';
import { getAuthUser } from '@/backend/get-auth-user.backend';
import { AuthUser } from '@/shared/models/auth-user.model';
import { getLocalStorageValue, setLocalStorageValue } from './general.helpers';

export function useUser() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authenticated, setAutenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getUserDetails() {
      try {
        const user =
          getLocalStorageValue<AuthUser>('auth') ?? (await getAuthUser()); // update with token
        const isAuthenticated = user && user.username;
        if (isAuthenticated) {
          setUser(user);
          setAutenticated(true);
          setLocalStorageValue('auth', user);
          // TODO: update this info into redux store, this way the credentials can be accessed via selectors
        }
      } catch (err) {}

      setLoading(false);
      return;
    }
    setLoading(true);
    getUserDetails();
  }, []);
  return { user, authenticated, loading };
}
