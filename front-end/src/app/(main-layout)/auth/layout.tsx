import { Box, Container } from '@mui/material';
import React from 'react';

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Container disableGutters>
      <Box p={2}>{children}</Box>
    </Container>
  );
}
