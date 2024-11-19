'use server';

import { authApi } from '@/api-client/auth-api';
import { LoginPayload, LoginResponse, ResponseData } from '@/models';
import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';
const DAY_BY_SECOND = 60 * 60 * 24;
export async function handleLogin(
  payload: LoginPayload
): Promise<ResponseData<LoginResponse> | void> {
  try {
    const {
      data: { access_token, refresh_token },
    } = await authApi.login(payload);
    // const jwtToken = res.data.access_token;
    // const session = await getServerActionSession();
    // session.jwt = jwtToken;
    // session.isLoggedIn = true;
    // await session.save();
    (await cookies()).set('session', access_token, {
      httpOnly: true,
      secure: false,
      path: '/',
      maxAge: DAY_BY_SECOND,
    });
    // Return the redirect rather than calling it directly
  } catch {
    return {
      success: false,
      message: 'Tài khoản hoặc mật khẩu không chính xác',
      status: 400,
    };
  }
  return redirect('/', RedirectType.push);
}
