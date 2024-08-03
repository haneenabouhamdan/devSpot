import { useMutation } from '@apollo/client';
import {
  CREATE_SUBMISSION,
  CreateSubmissionInput,
  GET_CHALLENGES,
} from '../Queries';
import { clientOptionType } from '../../sharedTypes';

interface CreateSubmissionResponse {
  id: string;
}

interface CreateSubmissionProps {
  payload: CreateSubmissionInput;
  onCompleted: (
    data: { CreateSubmission: CreateSubmissionResponse },
    clientOptions?: clientOptionType
  ) => void;
  refetch?: boolean;
}

export function useCreateSubmission() {
  const [mutate, { data, loading, error }] = useMutation<
    { CreateSubmission: CreateSubmissionResponse },
    { createSubmissionInput: CreateSubmissionInput }
  >(CREATE_SUBMISSION);

  async function createSubmission({
    payload,
    onCompleted,
    refetch = true,
  }: CreateSubmissionProps) {
    await mutate({
      variables: { createSubmissionInput: payload },
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
    createSubmission,
    data,
    loading,
    error,
  };
}
