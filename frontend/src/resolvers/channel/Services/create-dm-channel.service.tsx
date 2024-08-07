import { useMutation } from '@apollo/client';
import { CREATE_DM_CHANNEL, CreateDMChannelInput } from '../Queries';
import { clientOptionType } from '../../sharedTypes';

interface CreateDMChannelResponse {
  id: string;
}

interface CreateDMChannelProps {
  payload: CreateDMChannelInput;
  onCompleted: (
    data: { createDmChannel: CreateDMChannelResponse },
    clientOptions?: clientOptionType
  ) => void;
  refetch?: boolean;
}

export function useCreateDMChannelMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    { createDmChannel: CreateDMChannelResponse },
    { createDmChannelDto: CreateDMChannelInput }
  >(CREATE_DM_CHANNEL);

  async function createDMChannel({
    payload,
    onCompleted,
    refetch = true,
  }: CreateDMChannelProps) {
    await mutate({
      variables: { createDmChannelDto: payload },
      onCompleted: (data: any) => {
        if (data) {
          onCompleted(data);
        }
      },
    });
  }

  return {
    createDMChannel,
    data,
    loading,
    error,
  };
}
