import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

const ProductDetailSkeleton: React.FC = () => {
    return (
        <Box sx={{ p: { xs: 1, md: 3 } }}>
            <Grid container spacing={4}>
                {/* Left: Images */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 10 }}>
                            <Skeleton variant="rectangular" width="100%" height={500} sx={{ borderRadius: 2 }} animation="wave" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 2 }}>
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, gap: 1 }}>
                                {[1, 2, 3, 4].map((i) => (
                                    <Skeleton key={i} variant="rectangular" width={60} height={70} sx={{ borderRadius: 1 }} animation="wave" />
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Right: Details */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Skeleton variant="text" height={60} width="80%" sx={{ mb: 1 }} animation="wave" />
                    <Skeleton variant="text" height={40} width="30%" sx={{ mb: 1 }} animation="wave" />
                    <Skeleton variant="text" height={20} width="40%" sx={{ mb: 3 }} animation="wave" />

                    <Skeleton variant="rectangular" height={100} width="100%" sx={{ mb: 3, borderRadius: 1 }} animation="wave" />

                    <Skeleton variant="text" width="20%" sx={{ mb: 1 }} animation="wave" />
                    <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                        {[1, 2, 3].map(i => <Skeleton key={i} variant="rectangular" width={40} height={40} sx={{ borderRadius: 1 }} animation="wave" />)}
                    </Box>

                    <Skeleton variant="text" width="20%" sx={{ mb: 1 }} animation="wave" />
                    <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                        {[1, 2, 3, 4].map(i => <Skeleton key={i} variant="rectangular" width={40} height={40} sx={{ borderRadius: 1 }} animation="wave" />)}
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
                        <Skeleton variant="rectangular" height={50} width="100%" sx={{ borderRadius: 1 }} animation="wave" />
                        <Skeleton variant="rectangular" height={50} width="100%" sx={{ borderRadius: 1 }} animation="wave" />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductDetailSkeleton;
