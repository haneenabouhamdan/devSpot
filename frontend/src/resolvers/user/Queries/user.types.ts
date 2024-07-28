export interface UpdateUserInput {
  id: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  bio?: string | null;
  jobTitle?: string | null;
  dateOfBirth?: string | null;
  notificationPaused?: boolean;
  profilePicture?: string | null;
}
