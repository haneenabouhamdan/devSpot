import { gql } from '@apollo/client';

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

export const ACCEPT_INVITATION = gql`
  mutation AcceptInvitation($invitationInput: InvitationInput!) {
    acceptInvitation(invitationInput: $invitationInput) {
      message
      success
    }
  }
`;

export const IGNORE_INVITATION = gql`
  mutation IgnoreInvitation($invitationInput: InvitationInput!) {
    ignoreInvitation(invitationInput: $invitationInput) {
      message
      success
    }
  }
`;

export const CREATE_DM_CHANNEL = gql`
  mutation CreateDmChannel($createDmChannelDto: CreateDmChannelDto!) {
    createDmChannel(CreateDmChannelDto: $createDmChannelDto) {
      id
    }
  }
`;

export const DM_CHANNELS = gql`
  query UserDms($userDmsId: UUID!) {
    userDms(id: $userDmsId) {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      isPrivate
      isGroupChat
      createdBy
      photo
    }
  }
`;
