import { useMutation } from '@apollo/client';
import {
  CREATE_CHANNEL,
  CreateChannelInput,
  GET_USER_CHANNELS,
} from '../Queries';
import { clientOptionType } from '../../sharedTypes';

interface CreateChannelResponse {
  id: string;
}

interface CreateChannelProps {
  payload: CreateChannelInput;
  onCompleted: (
    data: { createChannel: CreateChannelResponse },
    clientOptions?: clientOptionType
  ) => void;
  refetch?: boolean;
}

export function useCreateChannelMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    { createChannel: CreateChannelResponse },
    { createChannelDto: CreateChannelInput }
  >(CREATE_CHANNEL);

  async function createChannel({
    payload,
    onCompleted,
    refetch = true,
  }: CreateChannelProps) {
    await mutate({
      variables: { createChannelDto: payload },
      onCompleted,
      refetchQueries: [
        {
          query: GET_USER_CHANNELS,
          variables: { userChannelsId: payload.createdBy },
        },
      ],
    });
  }

  return {
    createChannel,
    data,
    loading,
    error,
  };
}
