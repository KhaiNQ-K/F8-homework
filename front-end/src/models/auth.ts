export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  success: boolean;
  message: string;
  data: TokenResponse;
}
interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expiredIn: string;
}
export interface UserProfile {
  name?: string;
  email: string;
  role?: string;
}
export interface ResponseData<T> {
  message: string;
  error?: string;
  success: boolean;
  data?: T;
  status?: number;
}
export interface RegisterPayload {
  email: string;
  password: string;
  role?: string;
  name?: string;
}
