'use server';

import { authApi } from '@/api-client/auth-api';
import { RegisterPayload } from '@/models';
import { redirect } from 'next/navigation';

export const register = async (data: RegisterPayload) => {
  try {
    await authApi.register(data);
    // return {
    //   success: true,
    //   message: 'Đăng ký thành công',
    //   status: 200,
    // };
    // Return the redirect rather than calling it directly
  } catch (err: unknown) {
    return {
      success: false,
      message: err.error,
      status: 400,
    };
  }
  redirect('/auth/login');
};
