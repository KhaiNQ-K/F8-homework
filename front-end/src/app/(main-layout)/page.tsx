import { Box, Typography } from '@mui/material';
import LogoutButton from './auth/_component/LogoutButton';
import { getSession } from '../lib/session';

export default async function Home() {
  // const response = await getProfile();
  const user = await getSession();
  return (
    <Box>
      <Typography component="h2" variant="h4">
        Xin chào, {user?.name || user.email}
      </Typography>
      <LogoutButton />
    </Box>
  );
}
