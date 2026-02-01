import { TextField } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { CustomInputProps } from '../types/global.types';
import { validatePassword } from '../Utils/validation';

const CustomInput: React.FC<CustomInputProps> = (
  { type = "text", label, value, onChange, required = false, name, validator = null }) => {
  const [touched, setTouched] = useState(false);

  const errorMessage =
    touched && validator ? validator(value) : "";
  return (
    <div>
      <CustomInputField
        type={type}
        label={label}
        variant="outlined"
        value={value}
        onChange={onChange}
        fullWidth
        required={required}
        name={name}
        error={Boolean(errorMessage)}
        helperText={errorMessage}
        onBlur={() => setTouched(true)}
        inputProps={
          type === "tel"
            ? {
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 10
            }
            : {}
        }
      />
    </div>
  )
}

export default CustomInput
const CustomInputField = styled(TextField)({
  borderRadius: "none",
  margin: "20px 0px 20px 0px",
})