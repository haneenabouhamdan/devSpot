import { useQuery } from '@apollo/client';
import { Channel, DM_CHANNELS, GET_USER_CHANNELS } from '../Queries';

interface UserChannelsData {
  userChannels: Channel[];
}

export function useUserChannels(userId: string) {
  const { data, loading } = useQuery<UserChannelsData>(GET_USER_CHANNELS, {
    variables: { userChannelsId: userId },
  });

  return {
    data: data?.userChannels,
    loading,
  };
}

export function useUserDms(userId: string) {
  const { data, loading } = useQuery<UserChannelsData>(DM_CHANNELS, {
    variables: { userDmsId: userId },
  });

  return {
    data: data?.userDms,
    loading,
  };
}
