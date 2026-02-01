import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styled from "styled-components";
import { CustomInputProps } from "../types/global.types";

const PasswordInput: React.FC<CustomInputProps> = ({ label = "Password", value, onChange, required = false, name,validator=null }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  // Run validation if provided
  const errorMessage =
    touched && validator ? validator(value) : "";
  return (
    <StyledTextField
      type={showPassword ? "text" : "password"}
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
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;

const StyledTextField = styled(TextField)({
  borderRadius: "4px",
  margin: "20px 0px 0px 0px",
});
