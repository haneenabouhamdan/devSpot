import { useQuery } from '@apollo/client';
import { GET_CHANNEL_DETAILS } from '../Queries';
import { User, Message } from '../interfaces'; // Ensure the correct path

interface ChannelsDetailsDto {
  messages: Message[];
  members: User[];
}

export function useChannelDetails(channelId: string) {
  const { data, loading, error, refetch } = useQuery<{
    channel: ChannelsDetailsDto;
  }>(GET_CHANNEL_DETAILS, {
    variables: { channelId },
  });

  return {
    data: data?.channel,
    loading,
    error,
    refetch,
  };
}
