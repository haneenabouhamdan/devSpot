import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useHTTPContext } from './GraphQLProvider';
import { LoginResponse } from '../resolvers';


export function AuthenticationProvider({ children }: { children: ReactNode }) {
  const { authenticate } = useHTTPContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getCurrentUser, user, loading: isAuthenticating, error } = useAuthUserQuery();

  const onUserLogin = useCallback((data: LoginResponse) => {
    authenticate(data.token);
    getUser();
    localStorage.setItem('token', data.token);
    localStorage.setItem('uId', String(data.user.id));
  }, []);

  function getUser() {
    void getCurrentUser();
    setIsAuthenticated(true);
  }

  const onUserLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('uId');
    localStorage.removeItem('welcomed');

    setIsAuthenticated(false);
  }, []);

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

  useEffect(() => {
    if (error) {
      onUserLogout();
    }
  }, [error]);

  const contextValue = useMemo(
    () => ({
      user,
      onUserLogin,
      onUserLogout,
      isAuthenticated,
      isAuthenticating,
    }),
    [user,  isAuthenticated, onUserLogin, onUserLogout, isAuthenticating]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
