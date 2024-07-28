import { type ReactNode, useCallback, useMemo, useState } from 'react';
import { useHTTPContext } from './GraphQLProvider';
import { AuthResponse, useGetProfileQuery } from '../resolvers';
import { AuthContext } from '../contexts/AuthContext';

export function AuthenticationProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { authenticate } = useHTTPContext();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );
  const {
    getCurrentUser,
    user,
    loading: isAuthenticating,
  } = useGetProfileQuery();

  const getUser = useCallback(() => {
    if (isAuthenticated) getCurrentUser();
  }, [getCurrentUser, isAuthenticated]);

  const onUserLogin = useCallback(
    (data: AuthResponse) => {
      authenticate(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('uId', String(data.user.id));
      setIsAuthenticated(true);
      getUser();
    },
    [authenticate, getUser]
  );

  const onUserLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('uId');
    setIsAuthenticated(false);
  }, []);

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

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
