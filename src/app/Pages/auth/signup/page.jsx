"use client"
import CustomButton from '@/app/Components/CustomButton'
import CustomInput from '@/app/Components/CustomInput'
import WithLayout from '@/app/HOC/WithLayout';
import { Box, Typography } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import styled from 'styled-components'

const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleNameChange = (event) => {
    setName(event.target.value)
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  };
  const handleLogin = () => {
    alert("login")
  };
  return (
    <Box>
    <Head>
        <title>Sign Up</title>
        <meta name="description" content="Sign Up Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SignUpContainer>
      <form className="signUpBox" onSubmit={handleLogin}>
        <Typography variant='h4' className='signUpTitle'>Register</Typography>
        <Typography variant='subtitle1' className='signUpSubTitle'>to get started</Typography>
        <CustomInput
          label="Name"
          value={name}
          onChange={handleNameChange}
        />
        <CustomInput
          label="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <CustomInput
          type='password'
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          required={true}
        />
        <Link href={"/Pages/auth/forgot-password"} className='forgotPasswordText'>Forgot Password?</Link>
        <CustomButton
          type={"submit"}
          label={"Register"}
        />
        <Typography className='redirectLink'>Already have an account?  <Link href={"/Pages/auth/signin"} className='registerLink'>Login</Link></Typography>
      </form>
    </SignUpContainer>
    </Box>
    
  )
}

export default WithLayout(SignUp)

const SignUpContainer = styled(Box)({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& .signUpBox": {
    border: "1px solid #D9D9D9",
    borderRadius: "10px",
    padding: "20px",
    width: "50%",
    "@media (max-width: 991px)": {
      width: "90%",
      padding: "10px",
    },
  },
  "& .signUpTitle": {
    color: "#626262"
  },
  "& .signUpSubTitle": {
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