export interface AuthUser {
  id: string;
  username: string;
  phoneNumber: string;
  email?: string;
  bio: string;
  jobTitle: string;
  dateOfBirth: string;
  notificationPaused: boolean;
  profilePicture?: string;
  fcmToken?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}
