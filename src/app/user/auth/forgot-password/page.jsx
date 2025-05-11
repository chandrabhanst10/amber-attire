"use client"
import CustomButton from '@/app/Components/CustomButton';
import CustomInput from '@/app/Components/CustomInput';
import WithLayout from '@/app/HOC/WithLayout';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import styled from 'styled-components';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const router = useRouter();
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    };
    const handleForgotPassword = () => {
        router.push('/user/auth/verify-otp')
    };
    return (
        <ForgotPasswordContainer>
            <form className="ForgotPasswordBox" onSubmit={handleForgotPassword}>
                <Typography variant='h4' className='ForgotPasswordTitle'>Forgot Password</Typography>
                <Typography variant='subtitle1' className='ForgotPasswordSubTitle'>Enter Email To get otp</Typography>
                <CustomInput
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <CustomButton
                    type={"submit"}
                    label={"Send Otp"}
                />
            </form>
        </ForgotPasswordContainer>
    )
}

export default ForgotPassword
const ForgotPasswordContainer = styled(Box)({
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .ForgotPasswordBox": {
        border: "1px solid #D9D9D9",
        borderRadius: "10px",
        padding: "20px",
        width: "50%",
        "@media (max-width: 991px)": {
            width: "90%",
            padding: "10px",
        },
    },
    "& .ForgotPasswordTitle": {
        color: "#626262"
    },
    "& .ForgotPasswordSubTitle": {
        color: "#a7a5a5"
    },
    "& .forgotPasswordText": {
        color: "#626262",
        marginTop: "10px",
        textAlign: "end",
        width: "100%",
        display: "block"
    },
})