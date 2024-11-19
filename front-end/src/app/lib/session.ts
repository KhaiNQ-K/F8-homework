import { cookies } from 'next/headers';

export const setSession = async (accessToken: string, user: any) => {
  await fetch(`${process.env.APP_URL}/api/session`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ accessToken, user }),
  });
};
export const getSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  const res = await fetch(`${process.env.APP_URL}/api/session`, {
    headers: {
      'access-token': token,
    },
  });
  if (!res.ok) {
    return false;
  }
  const { user } = await res.json();

  return user;
};
