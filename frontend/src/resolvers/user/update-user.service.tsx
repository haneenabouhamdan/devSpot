import { useMutation } from '@apollo/client';
import { UPDATE_USER, UpdateUserInput } from './Queries';

interface UpdateUserResponse {
  id: string;
}

export function useUpdateUserMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    { updateUser: UpdateUserResponse },
    { updateUserDto: UpdateUserInput }
  >(UPDATE_USER);

  async function updateUser(payload: UpdateUserInput) {
    await mutate({
      variables: {
        updateUserDto: payload,
      },
    });
  }

  return {
    updateUser,
    isUserUpdated: Boolean(data?.updateUser) && !error,
    updating: loading,
    error,
  };
}
