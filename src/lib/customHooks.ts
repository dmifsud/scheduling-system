import { useState, useEffect } from 'react';
import { getAuthUser } from '@/backend/get-auth-user.backend';
import { AuthUser } from '@/shared/models/auth-user.model';
import { useAuthStateSelector } from '@/store/selectors/auth-user.selectors';
import { loginSuccess } from '@/store/auth.slice';
// NOTE: this is not ideal in commercial app. Due to mock api some parts had to be hacked
export function useUser() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authenticated, setAutenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: authUser } = useAuthStateSelector();

  useEffect(() => {
    async function getUserDetails() {
      try {
        const user = await getAuthUser();
        const isAuthenticated = user && user.username;
        if (isAuthenticated) {
          setUser(user); // TODO: should hydrate authState instead
          setAutenticated(true);
          // TODO: update this info into redux store, this way the credentials can be accessed via selectors
        }
      } catch (err) {
        setAutenticated(false);
        setUser(null);
      }

      setLoading(false);
      return;
    }
    setLoading(true);
    getUserDetails();
  }, [authUser]);
  return { user, authenticated, loading };
}
