"use client"
import { Box, Card, CardContent, Typography } from '@mui/material'
import styled from 'styled-components'
import { ProductFallBackImage } from '../Assets'
import useCustomNavigate from '../Utils/Navigation'

import { ProductCardProps } from '../types/types';

const ProductCard: React.FC<ProductCardProps> = ({ productImage, productTitle, productSubTitle, productPrice, productColorCount, path }) => {
    const router = useCustomNavigate();
    const handleNavigation = (path: string) => {
        router(path);
    };
    return (
        <ProductCardContainer sx={{ maxWidth: 345, margin: "auto" }} onClick={() => handleNavigation(path)}>
            <img src={productImage || ProductFallBackImage} style={{ width: "100%", height: "300px", objectFit: "fill" }} alt='productImage' width={1000} height={300} />
            <CardContent>
                <Box className="priceContainer">
                    <Typography className='productTitle'>{productTitle}</Typography>
                    <Typography className='productPrice'>&#8377;{productPrice}</Typography>
                </Box>
                <Typography component={"div"} variant="body2" sx={{ color: 'text.secondary' }}>{productSubTitle.length > 48 ? productSubTitle.slice(0, 48) : productSubTitle}</Typography>
            </CardContent>
        </ProductCardContainer>
    )
}

export default ProductCard
const ProductCardContainer = styled(Card)({
    margin: "auto !important",
    cursor: "pointer",
    "& .priceContainer": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "start",
        width: "100%",
    },
    "& .productPrice": {
        color: "gray"
    },
    "& .productTitle": {
        color: "#00000"
    },
})