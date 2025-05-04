"use client"
import CustomButton from '@/app/Components/CustomButton';
import CustomInput from '@/app/Components/CustomInput';
import WithLayout from '@/app/HOC/WithLayout';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react'
import styled from 'styled-components';

const VerifyOtp = () => {
    const [otp, setOtp] = useState("")
    const handleOtpChange = (event) => {
      setOtp(event.target.value)
    };
    const handleVerifyOtp = () => {
        alert("verify otp")
    };
    return (
        <VerifyOtpContainer>
            <Box className="VerifyOtpBox">
                <Typography variant='h4' className='VerifyOtpTitle'>Verify OTP</Typography>
                <Typography variant='subtitle1' className='VerifyOtpSubTitle'>Enter Otp To Verify</Typography>
                <CustomInput
                    label="Otp"
                    value={otp}
                    onChange={handleOtpChange}
                />
                <CustomButton
                    label={"Send Otp"}
                    onClick={handleVerifyOtp}
                />
            </Box>
        </VerifyOtpContainer>
    )
}

export default WithLayout(VerifyOtp)

const VerifyOtpContainer = styled(Box)({
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .VerifyOtpBox": {
        border: "1px solid #D9D9D9",
        borderRadius: "10px",
        padding: "20px",
        width: "50%",
        "@media (max-width: 991px)": {
            width: "90%",
            padding: "10px",
        },
    },
    "& .VerifyOtpTitle": {
        color: "#626262"
    },
    "& .VerifyOtpSubTitle": {
        color: "#a7a5a5"
    },
    "& .VerifyOtpText": {
        color: "#626262",
        marginTop: "10px",
        textAlign: "end",
        width: "100%",
        display: "block"
    },
})