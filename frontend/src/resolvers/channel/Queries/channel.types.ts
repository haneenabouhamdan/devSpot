export interface CreateChannelInput {
  createdBy: string;
  description?: string;
  isGroupChat?: boolean;
  isPrivate?: boolean;
  name: string;
  photo?: string;
  users?: string[];
}

export interface InvitationInput {
  userId: string;
  channelId: string;
}
