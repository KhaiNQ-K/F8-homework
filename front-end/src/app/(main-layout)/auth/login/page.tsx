import { handleLogin } from '@/app/actions/login';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Box, Paper, Typography } from '@mui/material';
import LoginForm from './_component/LoginForm';
export default function LoginPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper elevation={2}>
        <Box p={6} textAlign="center">
          <Typography component={'h1'} variant="h4" fontWeight={600}>
            Welcome
          </Typography>
          <Box mt={3}>
            <LockOpenIcon color="error" fontSize="large" />
          </Box>
          <Box>
            <LoginForm action={handleLogin} />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
