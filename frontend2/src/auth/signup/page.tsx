import { Box, Paper, Typography, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import PasswordInput from '../../Components/CustomPasswordInput'
import useCustomNavigate from '../../Utils/Navigation'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { validateName, validateEmail, validatePassword, validatePhone } from "../../Utils/validation.js";
import { Link } from 'react-router-dom'
import CustomInput from '../../Components/CustomInput'
import CustomButton from '../../Components/CustomButton'
import { registerUser } from '../../redux/slices/userSlice'

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigate = useCustomNavigate();
  const dispatch = useDispatch<any>();
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(event.target.value)
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(event.target.value)
  };
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPhone(event.target.value)
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(event.target.value)
  };
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault()
    let response = await dispatch(registerUser({ name, phone, email, password }));
    if (response?.payload?.success) {
      // Registration successful, navigate to OTP verification
      const userRole = response.payload.user.role || "user";
      navigate(`/verify-otp?phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&role=${encodeURIComponent(userRole)}`);
      toast.success(response.payload.message || "Registration successful. Please verify OTP.");
    } else {
      toast.error(response?.payload?.message || response?.error?.message || "Registration failed");
    }
  };
  return (
    <SignUpContainer>
      <IconButton
        onClick={() => navigate('/')}
        sx={{ position: 'absolute', top: 20, left: 20, color: 'text.primary' }}
        aria-label="back to home"
      >
        <ArrowBackIcon />
      </IconButton>
      <StyledCard elevation={3} className="signUpBox">
        <form onSubmit={handleRegister} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='h4' fontWeight="bold" gutterBottom color="text.primary">Create Account</Typography>
          <Typography variant='subtitle1' color="text.secondary" sx={{ mb: 3 }}>Join Amber Attire today</Typography>

          <Box sx={{ width: '100%', mb: 2 }}>
            <CustomInput
              label="Name"
              value={name}
              onChange={handleNameChange}
              required={true}
              validator={validateName}
            />
          </Box>
          <Box sx={{ width: '100%', mb: 2 }}>
            <CustomInput
              type="email"
              label="Email"
              value={email}
              onChange={handleEmailChange}
              required={true}
              validator={validateEmail}
            />
          </Box>
          <Box sx={{ width: '100%', mb: 2 }}>
            <CustomInput
              type='tel'
              label="Phone"
              value={phone}
              onChange={handlePhoneChange}
              required={true}
              validator={validatePhone}
            />
          </Box>
          <Box sx={{ width: '100%', mb: 3 }}>
            <PasswordInput
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              name="password"
              validator={validatePassword}
            />
          </Box>

          <Box sx={{ mt: 2, width: '100%' }}>
            <CustomButton
              type={"submit"}
              label={"Register"}
              fullWidth={true}
            />
          </Box>

          <Box className="signFormBottomLink" sx={{ mt: 3, width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link to={"/forgot-password"} style={{ textDecoration: 'none', color: '#FE6B8B', fontWeight: 500, fontSize: '0.9rem', alignSelf: 'flex-end' }}>
              Forgot Password?
            </Link>
            <Typography variant="body2" color="text.secondary">
              Already have an account? <Link to={"/sign-in"} style={{ textDecoration: 'none', color: '#FF8E53', fontWeight: 600 }}>Login</Link>
            </Typography>
          </Box>
        </form>
      </StyledCard>
    </SignUpContainer>
  )
}

export default SignUp;

const SignUpContainer = styled(Box)(({ theme }: { theme: any }) => ({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette?.background?.default || "#fff",
  padding: '20px',
}));

const StyledCard = styled(Paper)(({ theme }: { theme: any }) => ({
  padding: '40px',
  width: '100%',
  maxWidth: '450px',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  borderRadius: '16px',
  backgroundColor: theme.palette?.background?.paper || "#fff",
  '@media (max-width: 600px)': {
    padding: '20px',
  }
}));