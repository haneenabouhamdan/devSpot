export interface CreateChannelDto {
  createdBy: string;
  description: string;
  isGroupChat: Boolean;
  isPrivate: Boolean;
  name: string;
  photo?: string;
}
