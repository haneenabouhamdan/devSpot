export interface UpdateUserInput {
  id: string;
  email?: string;
  phoneNumber: string;
  username: string;
  dateOfBirth?: string;
  profilePicture?: string;
  notificationPaused?: boolean;
  bio?: string;
  jobTitle?: string;
}
