import { useLazyQuery } from '@apollo/client';
import { AUTH_USER } from './auth.graphql';
import { type AuthUser } from './auth.types';

export function useAuthUserQuery() {
  const [getCurrentUser, { data, loading, error, refetch }] = useLazyQuery<{ me: AuthUser }>(ME);

  return {
    getCurrentUser,
    user: data?.me,
    refetch,
    loading,
    error,
  };
}
