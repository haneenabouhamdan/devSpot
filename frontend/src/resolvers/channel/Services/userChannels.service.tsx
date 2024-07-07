import { useQuery } from "@apollo/client";
import { GET_USER_CHANNELS } from "../Queries";

interface UserChannelsData {
  userChannels: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    isPrivate: boolean;
    isGroupChat: boolean;
    createdBy: string;
    photo: string;
  };
}

export function useUserChannels(userId: string) {
  const { data, loading } = useQuery<UserChannelsData>(GET_USER_CHANNELS, {
    variables: { userChannelsId: userId },
  });

  return {
    data:data?.userChannels,
    loading,
  };
}
