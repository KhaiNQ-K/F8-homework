'use server';

import { authApi } from '@/api-client/auth-api';
import { LoginPayload, LoginResponse } from '@/models';
import { getServerActionSession } from '../lib/session';
import { redirect, RedirectType } from 'next/navigation';

export async function handleLogin(data: LoginPayload): Promise<LoginResponse | void> {
  try {
    const res = await authApi.login(data);
    const jwtToken = res.access_token;

    const session = await getServerActionSession();
    session.jwt = jwtToken;
    session.isLoggedIn = true;
    await session.save();
    // Return the redirect rather than calling it directly
  } catch (err) {
    console.log('error', err);
    return {
      success: false,
      message: 'Tài khoản hoặc mật khẩu không chính xác',
      status: 400,
    };
  }
  return redirect('/', RedirectType.push);
}
