export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  success: boolean;
  message: string;
  access_token?: string;
}
export interface UserProfile {
  name: string;
  email: string;
}
