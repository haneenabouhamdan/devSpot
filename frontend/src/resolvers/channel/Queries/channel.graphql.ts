import { gql } from "@apollo/client";

export const GET_USER_CHANNELS = gql`
  query UserChannels($userChannelsId: UUID!) {
    userChannels(id: $userChannelsId) {
      id
      createdAt
      updatedAt
      name
      description
      isPrivate
      isGroupChat
      createdBy
      photo
    }
  }
`;

export const GET_CHANNEL_DETAILS = gql`
  query Channel($channelId: UUID!) {
    channel(id: $channelId) {
      members {
        email
        jobTitle
        phoneNumber
        profilePicture
        status
        username
        bio
      }
      messages {
        messageReactions {
          emoji
        }
        attachments
        text
        status
        updatedAt
        createdAt
        sender {
          profilePicture
          phoneNumber
          username
        }
      }
    }
  }
`;

export const CREATE_CHANNEL = gql`
  mutation CreateChannel($createChannelDto: CreateChannelDto!) {
    createChannel(CreateChannelDto: $createChannelDto) {
      id
    }
  }
`;
