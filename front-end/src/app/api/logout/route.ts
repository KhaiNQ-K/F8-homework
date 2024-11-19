import { authApi } from '@/api-client/auth-api';
import { AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;
    if (token) {
      const res = await fetch(`${process.env.API_SERVER}/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        return NextResponse.json({
          success: false,
        });
      }
      cookieStore.delete('session');
      return NextResponse.json({
        success: true,
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
    });
  }
  return NextResponse.json({
    success: true,
  });
}
