import { Box, Button, Container, Divider, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          width: '100%',
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Password Reset
        </Typography>
        <Typography align="center" sx={{ mb: 2 }}>
          We Will Help You Reset your Password
        </Typography>

        <TextField
          fullWidth
          label="Enter Email Address"
          type="email"
          variant="outlined"
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: '#1a1a40',
            '&:hover': {
              bgcolor: '#000022',
            },
          }}
        >
          Reset Password
        </Button>

        <Divider sx={{ my: 3 }} />

        <Typography align="center" sx={{ mb: 1 }}>
          Remembered your Password?
        </Typography>

        <Link to="/admin/login">
          <Button
            fullWidth
            variant="outlined"
            sx={{
              textTransform: 'none',
              color: '#1a1a40',
              borderColor: '#ccc',
              '&:hover': {
                borderColor: '#1a1a40',
              },
            }}
          >
            Back to Sign In
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
