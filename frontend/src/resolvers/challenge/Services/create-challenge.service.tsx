import { useMutation } from '@apollo/client';
import {
  CREATE_CHALLENGE,
  CreateChallengeInput,
  GET_CHALLENGES,
} from '../Queries';
import { clientOptionType } from '../../sharedTypes';

interface CreateChallengeResponse {
  id: string;
}

interface CreateChallengeProps {
  payload: CreateChallengeInput;
  onCompleted: (
    data: { createChallenge: CreateChallengeResponse },
    clientOptions?: clientOptionType
  ) => void;
  refetch?: boolean;
}

export function useCreateChallenge() {
  const [mutate, { data, loading, error }] = useMutation<
    { createChallenge: CreateChallengeResponse },
    { createChallengeDto: CreateChallengeInput }
  >(CREATE_CHALLENGE);

  async function createChallenge({
    payload,
    onCompleted,
    refetch = true,
  }: CreateChallengeProps) {
    await mutate({
      variables: { createChallengeDto: payload },
      onCompleted,
      refetchQueries: refetch
        ? [
            {
              query: GET_CHALLENGES,
            },
          ]
        : [],
    });
  }

  return {
    createChallenge,
    data,
    loading,
    error,
  };
}
