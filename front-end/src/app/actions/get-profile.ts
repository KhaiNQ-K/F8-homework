import { authApi } from '@/api-client/auth-api';
import { ResponseData, UserProfile } from '@/models';
import { AxiosHeaders } from 'axios';

export const getProfile = async (token: string): Promise<ResponseData<UserProfile>> => {
  try {
    const headers = new AxiosHeaders();
    headers.setAuthorization(token);
    headers.setAccept('application/json');
    return authApi.getProfile(headers);
  } catch {
    return {
      success: false,
      message: 'Failed to fetch data',
    };
  }
};
