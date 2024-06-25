import { useMutation } from '@apollo/client';
import { PASSWORD_LOGIN } from './auth.graphql';
import { type LoginResponse } from './auth.types';

interface PasswordLoginPayload {
  identifier: string;
  password: string;
}

export function usePasswordLoginMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    {
      passwordLogin: LoginResponse;
    },
    { loginInput: PasswordLoginPayload }
  >(PASSWORD_LOGIN);

  async function login(payload: PasswordLoginPayload) {
    await mutate({
      variables: {
        loginInput: payload,
      },
    });
  }

  return {
    login,
    user: data?.passwordLogin.user,
    token: data?.passwordLogin.token,
    loading,
    error,
  };
}
