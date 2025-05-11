"use client"
import CustomButton from '@/app/Components/CustomButton'
import CustomInput from '@/app/Components/CustomInput'
import WithLayout from '@/app/HOC/WithLayout';
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import styled from 'styled-components'

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  };
  const handleRegister = () => {
    alert("login")
  };
  return (
    <SignInContainer>
      <form className="signInBox" onSubmit={handleRegister}>
        <Typography variant='h4' className='signInTitle'>Login</Typography>
        <Typography variant='subtitle1' className='signInSubTitle'>to get started</Typography>
        <CustomInput
          type='email'
          label="Email"
          value={email}
          onChange={handleEmailChange}
          required={true}
        />
        <CustomInput
          type='password'
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          required={true}
        />
        <Link href={"/user/auth/forgot-password"} className='forgotPasswordText'>Forgot Password?</Link>
        <CustomButton
          type={"submit"}
          label={"Login"}
        />
        <Typography className='redirectLink'>New User?  <Link href={"/user/auth/signup"} className='registerLink'>Register</Link></Typography>
      </form>
    </SignInContainer>
  )
}

export default SignIn
const SignInContainer = styled(Box)({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& .signInBox": {
    border: "1px solid #D9D9D9",
    borderRadius: "10px",
    padding: "20px",
    width: "50%",
    "@media (max-width: 991px)": {
      width: "90%",
      padding: "10px",
    },
  },
  "& .signInTitle": {
    color: "#626262"
  },
  "& .signInSubTitle": {
    color: "#a7a5a5"
  },
  "& .forgotPasswordText": {
    color: "#626262",
    marginTop: "10px",
    textAlign: "end",
    width: "100%",
    display: "block"
  },
  "& .redirectLink": {
    color: "#a7a5a5",
    display: "flex",
    marginTop: "20px",
    justifyContent: "center",
    cursor: "none"
  },
  "& .registerLink": {
    color: "#626262",
    cursor: "pointer"
  }
})