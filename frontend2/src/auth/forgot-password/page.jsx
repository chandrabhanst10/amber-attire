"use client"
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react'
import styled from 'styled-components';
import useCustomNavigate from '../../Utils/Navigation';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import { useDispatch } from 'react-redux';
import { resendOtp } from '../../redux/slices/userSlice';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const router = useCustomNavigate();
    const dispatch = useDispatch();

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    };
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter email");
            return;
        }
        try {
            const res = await dispatch(resendOtp({ email }));
            if (res?.payload?.success || res?.payload?.message === "OTP resent successfully") {
                toast.success("OTP sent successfully");
                router(`/verify-otp/?email=${email}`);
            } else {
                toast.error(res?.payload?.message || "Failed to send OTP");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
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