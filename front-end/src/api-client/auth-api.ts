import { LoginPayload, LoginResponse, RegisterPayload, ResponseData, UserProfile } from '@/models';
import axiosClient from './axiosClient';
import { AxiosHeaders } from 'axios';

export const authApi = {
  login(payload: LoginPayload): Promise<LoginResponse> {
    return axiosClient.post('/auth/login', payload);
  },
  getProfile(headers: AxiosHeaders): Promise<ResponseData<UserProfile>> {
    return axiosClient.get('/auth/profile', { headers: headers });
  },
  logout(headers: AxiosHeaders) {
    return axiosClient.post('/auth/logout', { headers: headers });
  },
  register(paylad: RegisterPayload) {
    return axiosClient.post('/auth/register', paylad);
  },
};
