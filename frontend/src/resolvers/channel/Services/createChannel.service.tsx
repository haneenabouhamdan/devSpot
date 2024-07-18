import { useMutation } from '@apollo/client';
import {
  CREATE_CHANNEL,
  CreateChannelDto,
  GET_USER_CHANNELS,
} from '../Queries';
import { clientOptionType } from '../../sharedTypes';

interface CreateChannelResponse {
  id: string;
}

interface CreateChannelProps {
  payload: CreateChannelDto;
  onCompleted: (
    data: { createChannel: CreateChannelResponse },
    clientOptions?: clientOptionType
  ) => void;
  refetch?: boolean;
}

export function useCreateChannelMutation() {
  const [mutate, { loading, error }] = useMutation<
    { createChannel: CreateChannelResponse },
    { createChannelDto: CreateChannelDto }
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
    loading,
    error,
  };
}
