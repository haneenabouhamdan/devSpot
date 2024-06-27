import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useHTTPContext } from './GraphQLProvider';
import { LoginResponse, useGetProfileQuery } from '../resolvers';
import { AuthContext } from '../contexts/AuthContext';

export function AuthenticationProvider({ children }: Readonly<{ children: ReactNode }>) {
  const { authenticate } = useHTTPContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getCurrentUser, user, loading: isAuthenticating } = useGetProfileQuery();

  const getUser = useCallback(() => {
    void getCurrentUser();
  }, [getCurrentUser]);

  const onUserLogin = useCallback(
    (data: LoginResponse) => {
      authenticate(data.token);
      getUser();
      localStorage.setItem('token', data.token);
    },
    [getUser, authenticate]
  );

  const onUserLogout = useCallback(() => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    }
  }, [user]);

  useEffect(() => {
    const existedToken = localStorage.getItem('token');
    if (existedToken) {
      authenticate(existedToken);
      getUser();
    } else {
      onUserLogout();
    }
  }, [authenticate, getUser, onUserLogout]);

  const contextValue = useMemo(
    () => ({
      user,
      onUserLogin,
      onUserLogout,
      isAuthenticated,
      isAuthenticating,
    }),
    [user, isAuthenticated, onUserLogin, onUserLogout, isAuthenticating]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
