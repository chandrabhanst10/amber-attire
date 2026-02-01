import { setCredentials } from '../../redux/slices/authSlice';
import { useLoginMutation } from '../../redux/apiSlice';
import PasswordInput from '../../Components/CustomPasswordInput'
import { Box, Paper, Typography, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { toast } from 'react-toastify';
import useCustomNavigate from '../../Utils/Navigation';
import Loader from '../../Components/Loader';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import CustomButton from '../../Components/CustomButton';
import { useDispatch } from 'react-redux';
import CustomInput from '../../Components/CustomInput';

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useCustomNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [login, { isLoading }] = useLoginMutation();
  const [redirectPath, setRedirectPath] = useState(null);

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value)
  };
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value)
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials({ user: response.user, accessToken: response.accessToken }));

      // Navigate based on role or previous path
      if (redirectPath) {
        navigate(redirectPath);
      } else if (response.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      toast.success(response.message || "Login Successful");
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed");
    }
  };
  return (
    <SignInContainer>
      <IconButton
        onClick={() => navigate('/')}
        sx={{ position: 'absolute', top: 20, left: 20, color: 'text.primary' }}
        aria-label="back to home"
      >
        <ArrowBackIcon />
      </IconButton>
      {isLoading && <Loader />}
      <StyledCard elevation={3} className="signInBox">
        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='h4' fontWeight="bold" gutterBottom color="text.primary">Welcome Back</Typography>
          <Typography variant='subtitle1' color="text.secondary" sx={{ mb: 3 }}>Login to your account</Typography>

          <Box sx={{ width: '100%', mb: 2 }}>
            <CustomInput
              type='email'
              label="Email"
              value={email}
              onChange={handleEmailChange}
              required={true}
            />
          </Box>
          <Box sx={{ width: '100%', mb: 3 }}>
            <PasswordInput
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              name="password"
            />
          </Box>

          <Box sx={{ mt: 2, width: '100%' }}>
            <CustomButton
              type={"submit"}
              label={"Login"}
              fullWidth={true}
            />
          </Box>

          <Box className="signFormBottomLink" sx={{ mt: 3, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to={"/forgot-password"} style={{ textDecoration: 'none', color: '#FE6B8B', fontWeight: 500 }}>
              Forgot Password?
            </Link>
            <Typography variant="body2" color="text.secondary">
              New here? <Link to={"/sign-up"} style={{ textDecoration: 'none', color: '#FF8E53', fontWeight: 600 }}>Register</Link>
            </Typography>
          </Box>
        </form>
      </StyledCard>
    </SignInContainer>
  )
}

export default SignIn

const SignInContainer = styled(Box)(({ theme }: { theme: any }) => ({
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