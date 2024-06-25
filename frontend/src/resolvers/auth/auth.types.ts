
export interface AuthUser {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}


