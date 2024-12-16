import React from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectProps,
} from '@mui/material'

interface FormSelectProps extends Omit<SelectProps, 'onChange'> {
  label: string
  options: Array<{ value: string; label: string }>
  onChange: (value: string) => void
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  options,
  value,
  onChange,
  ...props
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value as string)}
        {...props}
      >
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
