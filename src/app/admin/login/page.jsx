import { Box, Button, Checkbox, Container, Divider, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import Link from "next/link";

export default function Login() {
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
          Sign In
        </Typography>
        <Typography align="center" sx={{ mb: 2 }}>
          New to Our Product? <Link href="/signup" passHref><Typography component="span" color="primary" sx={{ cursor: 'pointer' }}>Create an Account</Typography></Link>
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
          label="Enter Password"
          type="password"
          variant="outlined"
          margin="normal"
        />

        <FormControlLabel
          control={<Checkbox />}
          label="Keep me signed in"
          sx={{ mt: 1 }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, bgcolor: '#1a1a40', "&:hover": { bgcolor: '#000022' } }}
        >
          Sign In
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          <Link href="/forgot-password" passHref>
            <Typography component="span" color="primary" sx={{ cursor: 'pointer' }}>
              Forgot your password?
            </Typography>
          </Link>
        </Typography>

        <Divider sx={{ my: 3 }}>Or sign in using:</Divider>

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
