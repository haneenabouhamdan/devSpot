import { createContext, useContext } from 'react';
import { AuthUser, LoginResponse } from '../resolvers';

export interface AuthContextProps {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  onUserLogin: (data: LoginResponse) => void;
  onUserLogout: () => void;
  user?: AuthUser;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isAuthenticating: false,
  onUserLogin: (data) => {
    console.group('[AuthContext]: onUserLogin');
    console.log('This method is not implemented yet!');
    console.log(data);
    console.groupEnd();
  },
  onUserLogout: () => {
    console.log('This method is not implemented yet!');
  },
});

export function useAuthContext() {
  return useContext(AuthContext);
}
