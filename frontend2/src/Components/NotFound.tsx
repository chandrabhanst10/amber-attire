import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <NotFoundContainer>
            <Typography variant="h1" fontWeight="bold" color="primary">404</Typography>
            <Typography variant="h5" sx={{ mt: 2, mb: 4 }}>Page Not Found</Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                Go to Homepage
            </Button>
        </NotFoundContainer>
    );
};

export default NotFound;

const NotFoundContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5'
});
