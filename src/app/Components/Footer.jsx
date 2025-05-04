import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <div>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light' ? '#f5f5f5' : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="body2" color="text.secondary" align="center">
                        {'© '}
                        {new Date().getFullYear()} Amber Attire. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </div>
    )
}

export default Footer