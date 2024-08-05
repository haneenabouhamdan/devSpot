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

export interface User {
  id: string;
  createdAt: string;
  deletedAt?: string;
  username: string;
  email: string;
  phoneNumber: string;
  status?: string;
  bio?: string;
  jobTitle?: string;
  dateOfBirth: string;
  notificationPaused: boolean;
  profilePicture?: string;
}
