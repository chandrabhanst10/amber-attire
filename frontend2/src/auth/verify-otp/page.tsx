import React, { useRef, useState } from "react";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useLocation } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../../redux/store"; // adjust path as necessary
import { resendOtp, verifyOtp } from "../../redux/slices/userSlice"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import useCustomNavigate from "../../Utils/Navigation";

const VerifyOtpPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useCustomNavigate();
  const loading = useAppSelector((state: any) => state.user.loading);
  const otpResentState = useAppSelector((state: any) => state.user.otpResent);
  const location = useLocation();

  // local OTP state (6 digits)
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // get params from route or query string
  const query = new URLSearchParams(location.search);
  const name = query.get("name") ?? "";
  const email = query.get("email") ?? "";
  const phone = query.get("phone") ?? "";
  const role = query.get("role") ?? "";
  console.log(email);


  // Auto-trigger OTP if requested (from Protected Route)
  React.useEffect(() => {
    if (location.state?.triggerOtp && !otpResentState && phone && email) {
      dispatch(resendOtp({ phone, email, name }))
        .unwrap()
        .then(() => toast.info("Account not verified. OTP sent to your email."))
        .catch(() => toast.error("Failed to send OTP"));
    }
  }, [location.state, otpResentState, dispatch, phone, email, name]);

  const handleChange = (index: number, value: string) => {
    // only digits allowed
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto-focus next input when user types
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      toast.error("Enter a valid 6-digit OTP");
      return;
    }

    if (!phone) {
      toast.error("Phone not found.");
      return;
    }

    try {
      const response: any = await dispatch(
        verifyOtp({
          phone,
          otp: finalOtp,
          email,
          name,
          role
        })
      );

      // expected shape depends on your thunk; adapt if you return response.data
      if (response?.payload?.success || response?.payload?.message === "OTP verified successfully" || response?.payload?.user) {
        toast.success("Verification successful!");

        // Redirect to original destination or default
        const from = location.state?.from?.pathname;
        if (from) {
          navigate(from);
        } else if (role === 'admin' || role === 'ADMIN') {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(response?.payload?.message || response?.error?.message || "Invalid OTP");
      }
    } catch (err) {
      toast.error("Verification failed");
    }
  };

  const handleResend = async () => {
    try {
      const res: any = await dispatch(resendOtp({ phone, email, name }));
      if (res?.payload?.success) {
        toast.success("OTP resent!");
      } else {
        toast.error(res?.payload?.message || "Failed to resend OTP");
      }
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 10,
        p: 4,
        borderRadius: 3,
        boxShadow: 3,
        bgcolor: "white",
      }}
    >
      <Typography variant="h5" textAlign="center" fontWeight="bold" mb={2}>
        Verify OTP
      </Typography>

      <Typography textAlign="center" color="text.secondary" mb={3}>
        Enter the 6-digit OTP sent to your phone.
      </Typography>

      <Stack direction="row" spacing={1} justifyContent="center" mb={3}>
        {otp.map((digit, index) => (
          <TextField
            key={index}
            inputRef={(el) => (inputRefs.current[index] = el)}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            inputProps={{
              maxLength: 1,
              style: { textAlign: "center", fontSize: "22px", width: "45px" },
            }}
            variant="outlined"
          />
        ))}
      </Stack>

      <LoadingButton
        fullWidth
        variant="contained"
        loading={Boolean(loading)}
        onClick={handleSubmit}
        sx={{ mt: 1, py: 1.5 }}
      >
        Verify OTP
      </LoadingButton>

      <Button fullWidth sx={{ mt: 2 }} onClick={handleResend}>
        Resend OTP
      </Button>
    </Box>
  );
};

export default VerifyOtpPage;
