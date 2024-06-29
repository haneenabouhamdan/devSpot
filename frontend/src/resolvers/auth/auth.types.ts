
export interface AuthUser {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}


