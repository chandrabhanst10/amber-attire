import { Box, Button, Container, Divider, TextField, Typography } from "@mui/material";

export default function ConfirmEmail() {
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
          Confirm Email
        </Typography>
        <Typography align="center" sx={{ mb: 2 }}>
          Check Your Email and Enter Confirmation Code
        </Typography>

        <TextField
          fullWidth
          label="Enter Code"
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
          Confirm Email
        </Button>

        <Divider sx={{ my: 3 }} />

        <Typography align="center" sx={{ mb: 1 }}>
          Haven’t received your code?
        </Typography>

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
          Resend Code
        </Button>
      </Box>
    </Container>
  );
}
