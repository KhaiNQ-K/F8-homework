'use client';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
export interface SelectOption {
  label?: string;
  value: number | string;
}
export interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  disabled?: boolean;
  options: SelectOption[];
}
export default function SelectField<T extends FieldValues>({
  name,
  control,
  label,
  disabled,
  options,
}: SelectFieldProps<T>) {
  const {
    field: { ref, value, onBlur, onChange },
    fieldState: { error, invalid },
  } = useController({ name, control });
  return (
    <FormControl
      variant="standard"
      fullWidth
      margin="normal"
      size="small"
      disabled={disabled}
      error={invalid}
      sx={{
        textAlign: 'left',
      }}
    >
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        inputRef={ref}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
