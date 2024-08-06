import { useMutation } from '@apollo/client';
import { CREATE_CHANNEL, CreateChannelInput } from '../Queries';
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
      onCompleted: (data: any) => {
        if (data) {
          onCompleted(data);
        }
      },
    });
  }

  return {
    createChannel,
    data,
    loading,
    error,
  };
}
