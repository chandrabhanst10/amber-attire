import { Box, Grid, Skeleton, Container } from '@mui/material';
import React from 'react';
import ProductCardSkeleton from './ProductCardSkeleton';

const HomeSkeleton: React.FC = () => {
    return (
        <Container maxWidth="xl" sx={{ mt: 2 }}>
            {/* Banner Skeleton */}
            <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 2, mb: 4 }} animation="wave" />

            {/* Section Title */}
            <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Skeleton variant="text" width={300} height={50} animation="wave" />
                <Skeleton variant="text" width={400} height={30} animation="wave" />
            </Box>

            {/* Product Grid */}
            <Grid container spacing={3}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item}>
                        <ProductCardSkeleton />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default HomeSkeleton;
