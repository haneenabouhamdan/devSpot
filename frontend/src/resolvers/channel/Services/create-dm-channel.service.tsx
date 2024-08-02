import { useMutation } from '@apollo/client';
import {
  CREATE_DM_CHANNEL,
  CreateDMChannelInput,
  GET_USER_CHANNELS,
} from '../Queries';
import { clientOptionType } from '../../sharedTypes';

interface CreateDMChannelResponse {
  id: string;
}

interface CreateDMChannelProps {
  payload: CreateDMChannelInput;
  onCompleted: (
    data: { CreateDMChannel: CreateDMChannelResponse },
    clientOptions?: clientOptionType
  ) => void;
  refetch?: boolean;
}

export function useCreateDMChannelMutation() {
  const [mutate, { data, loading, error }] = useMutation<
    { CreateDMChannel: CreateDMChannelResponse },
    { createDmChannelDto: CreateDMChannelInput }
  >(CREATE_DM_CHANNEL);

  async function createDMChannel({
    payload,
    onCompleted,
    refetch = true,
  }: CreateDMChannelProps) {
    await mutate({
      variables: { createDmChannelDto: payload },
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
    createDMChannel,
    data,
    loading,
    error,
  };
}
