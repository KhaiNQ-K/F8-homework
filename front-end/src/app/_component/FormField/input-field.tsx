'use client';

import { TextField, TextFieldProps } from '@mui/material';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { ChangeEvent } from 'react';
export type InputFieldProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
};

export function InputField<T extends FieldValues>({
  name,
  control,
  onChange: externalOnChange,
  ...rest
}: InputFieldProps<T>) {
  const {
    field: { ref, value, onBlur, onChange },
    fieldState: { error },
  } = useController({ name, control });
  return (
    <TextField
      fullWidth
      name={name}
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        externalOnChange?.(event);
      }}
      onBlur={onBlur}
      inputRef={ref}
      error={!!error}
      helperText={error?.message}
      {...rest}
    />
  );
}
