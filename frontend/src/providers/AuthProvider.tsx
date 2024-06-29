import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useHTTPContext } from './GraphQLProvider';
import { AuthResponse, useGetProfileQuery } from '../resolvers';
import { AuthContext } from '../contexts/AuthContext';

export function AuthenticationProvider({ children }: Readonly<{ children: ReactNode }>) {
  const { authenticate } = useHTTPContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getCurrentUser, user, loading: isAuthenticating } = useGetProfileQuery();

  const getUser = useCallback(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const onUserLogin = useCallback(
    (data: AuthResponse) => {
      authenticate(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('uId', String(data.user.id));
      getUser();
    },
    [authenticate, getUser]
  );

  const onUserLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('uId');
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    }
  }, [user]);

  useEffect(() => {
    const existedToken = localStorage.getItem('token');
    const existedUserId = localStorage.getItem('uId');
    if (existedToken && existedUserId) {
      authenticate(existedToken);
      getUser();
    } else {
      onUserLogout();
    }
  }, [onUserLogout]);

  const contextValue = useMemo(
    () => ({
      user,
      onUserLogin,
      onUserLogout,
      isAuthenticated,
      isAuthenticating,
    }),
    [user, onUserLogin, onUserLogout, isAuthenticated, isAuthenticating]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
