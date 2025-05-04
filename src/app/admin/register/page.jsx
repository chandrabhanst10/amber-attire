import { Box, Button, Container, Divider, Grid, TextField, Typography } from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import Link from "next/link";

export default function SignUp() {
  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box 
        sx={{ 
          width: '100%', 
          p: 4, 
          borderRadius: 3, 
          boxShadow: 3, 
          bgcolor: 'background.paper' 
        }}
      >
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Create an Account
        </Typography>
        <Typography align="center" sx={{ mb: 2 }}>
          Have an Account? <Link href="/login" passHref><Typography component="span" color="primary" sx={{ cursor: 'pointer' }}>Sign In</Typography></Link>
        </Typography>

        <TextField
          fullWidth
          label="Enter Email Address"
          type="email"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Create Password"
          type="password"
          variant="outlined"
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, bgcolor: '#1a1a40', "&:hover": { bgcolor: '#000022' } }}
        >
          Create Account
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          By creating account, you agree to our <Link href="/terms" passHref><Typography component="span" color="primary" sx={{ cursor: 'pointer' }}>Terms of Service</Typography></Link>
        </Typography>

        <Divider sx={{ my: 3 }}>Or create an account using:</Divider>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button 
              variant="outlined" 
              fullWidth 
              startIcon={<Google />} 
              sx={{ textTransform: "none" }}
            >
              Continue with Google
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="outlined" 
              fullWidth 
              startIcon={<Facebook />} 
              sx={{ textTransform: "none" }}
            >
              Continue with Facebook
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
