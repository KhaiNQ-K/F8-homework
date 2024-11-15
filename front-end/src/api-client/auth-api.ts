import { LoginPayload, LoginResponse, UserProfile } from '@/models';
import axiosClient from './axiosClient';

export const authApi = {
  login(payload: LoginPayload): Promise<LoginResponse> {
    return axiosClient.post('/auth/login', payload);
  },
  getProfile(): Promise<UserProfile> {
    return axiosClient.get('/auth/profile');
  },
  logout() {
    return axiosClient.post('/auth/logout');
  },
};
