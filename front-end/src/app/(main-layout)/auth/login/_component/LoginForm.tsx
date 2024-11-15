'use client';
import { InputField } from '@/app/_component/FormField';
import { PasswordField } from '@/app/_component/FormField/password-field';
import { LoginPayload, LoginResponse } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@mui/material';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface LoginFormProps {
  action: (formData: LoginPayload) => Promise<LoginResponse | void>;
}
export default function LoginForm({ action }: LoginFormProps) {
  const formRef = useRef(null);
  const schema = yup.object().shape({
    email: yup.string().required('Vui lòng nhập email').email('Email không đúng định dạng'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginPayload>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (data: LoginPayload) => {
    // await handleLogin(data);
    try {
      console.log(data);
      await action?.(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box ref={formRef} component="form" onSubmit={handleSubmit(handleSubmitForm)}>
      <InputField name="email" type="email" label="Email" control={control} variant="standard" />
      <PasswordField name="password" control={control} variant="standard" />
      <Button
        disabled={isSubmitting}
        startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null}
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
      >
        Login
      </Button>
    </Box>
  );
}
