import { Card, CardContent, Skeleton, Box } from '@mui/material';
import React from 'react';

const ProductCardSkeleton: React.FC = () => {
    return (
        <Card sx={{ maxWidth: 345, margin: "auto", width: '100%' }}>
            <Skeleton variant="rectangular" width="100%" height={300} animation="wave" />
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Skeleton variant="text" width="60%" animation="wave" />
                    <Skeleton variant="text" width="20%" animation="wave" />
                </Box>
                <Skeleton variant="text" width="80%" animation="wave" />
            </CardContent>
        </Card>
    );
};

export default ProductCardSkeleton;
