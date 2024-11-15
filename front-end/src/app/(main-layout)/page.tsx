import { Box, Typography } from '@mui/material';
import { getServerActionSession } from '../lib/session';
import LogoutButton from './auth/_component/LogoutButton';
import { UserProfile } from '@/models';

async function getProfile(): Promise<UserProfile | undefined> {
  const session = await getServerActionSession();
  try {
    const res = await fetch(`${process.env.API_SERVER}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    });
    if (!res.ok) {
      throw new Error('');
    }
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

export default async function Home() {
  const profile = await getProfile();
  console.log(profile);
  return (
    <Box>
      <Typography>Welcome, {profile?.email}</Typography>
      <LogoutButton />
    </Box>
  );
}
