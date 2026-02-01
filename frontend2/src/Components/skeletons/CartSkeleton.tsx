import { Box, Grid, Skeleton, Card } from '@mui/material';
import React from 'react';

const CartSkeleton: React.FC = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                <Skeleton variant="text" width={100} height={40} animation="wave" />
                <Skeleton variant="rectangular" width={80} height={36} animation="wave" sx={{ borderRadius: 1 }} />
            </Box>
            <Box sx={{ maxHeight: 400, overflow: 'hidden' }}>
                {[1, 2, 3].map((item) => (
                    <Grid container key={item} sx={{ p: 2, mb: 1, border: '1px solid #eee', borderRadius: 2, alignItems: 'center' }}>
                        <Grid size={{ xs: 3 }}>
                            <Skeleton variant="rectangular" width="100%" height={100} sx={{ borderRadius: 1 }} animation="wave" />
                        </Grid>
                        <Grid size={{ xs: 6 }} sx={{ px: 2 }}>
                            <Skeleton variant="text" width="60%" height={30} animation="wave" />
                            <Skeleton variant="text" width="40%" animation="wave" />
                        </Grid>
                        <Grid size={{ xs: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                                <Skeleton variant="circular" width={24} height={24} animation="wave" />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Skeleton variant="circular" width={24} height={24} animation="wave" />
                                <Skeleton variant="text" width={20} animation="wave" />
                                <Skeleton variant="circular" width={24} height={24} animation="wave" />
                            </Box>
                        </Grid>
                    </Grid>
                ))}
            </Box>
            <Box sx={{ mt: 3, p: 2, borderTop: '1px solid #eee' }}>
                <Grid container spacing={2}>
                    {[1, 2, 3].map(i => (
                        <Grid size={{ xs: 12 }} key={i}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Skeleton variant="text" width={100} animation="wave" />
                                <Skeleton variant="text" width={80} animation="wave" />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}

export default CartSkeleton;
