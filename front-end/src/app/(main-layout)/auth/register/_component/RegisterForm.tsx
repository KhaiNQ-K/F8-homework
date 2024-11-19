'use client';
import { InputField } from '@/app/_component/FormField';
import { PasswordField } from '@/app/_component/FormField/password-field';
import SelectField from '@/app/_component/FormField/select-field';
import { RegisterPayload } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@mui/material';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
export interface RegisterFormProps {
  action: (formData: RegisterPayload) => Promise<unknown | void>;
}
const roleOptions = [
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'User',
    value: 'user',
  },
];
export default function RegisterForm({ action }: RegisterFormProps) {
  const formRef = useRef(null);
  const schema = yup.object().shape({
    email: yup.string().required('Vui lòng nhập email').email('Email không đúng định dạng'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  });
  const [error, setError] = useState('');
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterPayload>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      role: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (data: RegisterPayload) => {
    try {
      const response: any = await action?.(data);
      if (!response.success) {
        setError(response.message);
      }
      setError('');
    } catch (err) {
      console.log(err);
    }
  };
  console.log(error);
  return (
    <Box ref={formRef} component="form" onSubmit={handleSubmit(handleSubmitForm)}>
      {error && <Box sx={{ color: 'red', mt: 2 }}>{error}</Box>}
      <InputField name="email" type="text" label="Email" control={control} variant="standard" />
      <PasswordField name="password" control={control} variant="standard" />
      <InputField name="name" type="text" label="Name" control={control} variant="standard" />
      {/* <InputField name="role" type="text" label="Role" control={control} variant="standard" /> */}
      <SelectField name="role" label="Role" control={control} options={roleOptions} />
      <Button
        disabled={isSubmitting}
        startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null}
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
      >
        Register
      </Button>
    </Box>
  );
}
