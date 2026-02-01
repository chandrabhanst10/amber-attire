import { Box, Grid, Skeleton, Card, CardContent } from '@mui/material';
import React from 'react';

const AddressSkeleton: React.FC = () => {
    return (
        <Box sx={{ maxWidth: 700, margin: 'auto', p: 3 }}>
            <Skeleton variant="text" width={200} height={40} sx={{ mx: 'auto', mb: 3 }} animation="wave" />
            <Skeleton variant="text" width={150} height={32} sx={{ mb: 2 }} animation="wave" />
            <Grid container spacing={2}>
                {[1, 2].map((item) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={item}>
                        <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                            <CardContent>
                                <Skeleton variant="text" width="60%" height={30} animation="wave" />
                                <Skeleton variant="text" width="50%" animation="wave" />
                                <Skeleton variant="text" width="90%" animation="wave" sx={{ mt: 1 }} />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 1 }} animation="wave" />
            </Box>
        </Box>
    )
}

export default AddressSkeleton;
