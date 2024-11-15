'use client';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { InputFieldProps } from './input-field';

export function PasswordField<T extends FieldValues>({
  name,
  control,
  onChange: externalOnChange,
  ...rest
}: InputFieldProps<T>) {
  const handleMouseDownPassword = (event: MouseEvent) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: MouseEvent) => {
    event.preventDefault();
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const {
    field: { ref, value, onBlur, onChange },
    fieldState: { error },
  } = useController({ name, control });
  return (
    <FormControl variant="standard" fullWidth>
      <TextField
        inputRef={ref}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChange(event);
          externalOnChange?.(event);
        }}
        onBlur={onBlur}
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'hide the password' : 'display the password'}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        label="Password"
        error={!!error}
        helperText={error?.message}
        {...rest}
      />
    </FormControl>
  );
}
