import { User } from '../../user';

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

export interface CreateDMChannelInput {
  users?: string[];
  createdBy: string;
  description?: string;
}

export interface Channel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string;
  description?: string;
  isPrivate: boolean;
  isGroupChat: boolean;
  createdBy: string;
  photo?: string;
}

export interface MessageReaction {
  emoji: string;
}

export interface Message {
  id?: string;
  senderId: string;
  channelId: string;
  text: string;
  attachments?: string[];
  createdAt: string;
  status?: string;
  updatedAt?: string;
  messageReactions?: MessageReaction[];
  sender: User;
}
