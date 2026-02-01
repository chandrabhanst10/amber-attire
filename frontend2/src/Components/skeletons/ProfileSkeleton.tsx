import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

const ProfileSkeleton: React.FC = () => {
    return (
        <Box sx={{ maxWidth: 700, margin: 'auto', p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Skeleton variant="circular" width={100} height={100} animation="wave" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Skeleton variant="text" width={150} height={40} animation="wave" />
            </Box>
            <Grid container spacing={3}>
                {[1, 2, 3].map((item) => (
                    <Grid size={{ xs: 12 }} key={item}>
                        <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} animation="wave" />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 1 }} animation="wave" />
            </Box>
        </Box>
    )
}

export default ProfileSkeleton;
