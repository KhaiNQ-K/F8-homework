import { Box, Typography } from '@mui/material';
import React from 'react';
import LogoutButton from '../auth/_component/LogoutButton';

export default function AdminPage() {
  return (
    <Box>
      <Typography component="h2" variant="h4">
        Xin chào, Khainguyen
      </Typography>
      <Typography>Đây là page dành cho role admin</Typography>
      <LogoutButton />
    </Box>
  );
}
