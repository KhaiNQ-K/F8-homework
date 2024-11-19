import { register } from '@/app/actions/register';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Box, Paper, Typography } from '@mui/material';
import RegisterForm from './_component/RegisterForm';
export default function RegisterPage() {
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
            Register
          </Typography>
          <Box mt={3}>
            <LockOpenIcon color="error" fontSize="large" />
          </Box>
          <Box>
            <RegisterForm action={register} />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
