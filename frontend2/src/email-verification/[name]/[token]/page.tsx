"use client";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Typography, Box, Button } from "@mui/material";

export default function VerifyEmailPage() {
  const { name, token } = useParams<{ name: string; token: string }>(); // get name + token from URL
  const navigate = useNavigate();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying"); // verifying | success | error

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.post("http://localhost:5500/auth/user/verify-email", { token });

        if (res.data.success) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };

    if (token) verifyEmail();
  }, [token]);

  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      {status === "verifying" && (
        <>
          <CircularProgress />
          <Typography variant="h6" mt={2}>
            Verifying your email, please wait...
          </Typography>
        </>
      )}

      {status === "success" && (
        <>
          <Typography variant="h5" color="green">
            🎉 Email verified successfully!
          </Typography>
          <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate("/sign-in")}>
            Go to Login
          </Button>
        </>
      )}

      {status === "error" && (
        <>
          <Typography variant="h5" color="red">
            ❌ Verification failed or link expired.
          </Typography>
          <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate("/sign-up")}>
            Register Again
          </Button>
        </>
      )}
    </Box>
  );
}
