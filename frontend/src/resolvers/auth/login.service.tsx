import { useMutation } from '@apollo/client';
import { SIGN_IN } from './auth.graphql';
import { type LoginResponse } from './auth.types';

export interface LoginPayload {
  identifier: string;
  password: string;
}

export function useSigninMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    {
      signIn: LoginResponse;
    },
    { signInInput: LoginPayload }
  >(SIGN_IN);

  async function signIn(payload: LoginPayload) {
    const result = await mutate({
      variables: {
        signInInput: payload,
      },
    });
    return result; 
  }

  return {
    signIn,
    user: data?.signIn.user,
    token: data?.signIn.token,
    loading,
    error,
  };
}
