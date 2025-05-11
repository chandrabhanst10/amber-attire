"use client"
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import styled from 'styled-components'

const ProductCard = ({ productImage, productTitle, productSubTitle, productPrice, productColorCount,path }) => {
    const router = useRouter();
  const handleNavigation = (path) => {
    router.push(path);
  };
    return (
        <ProductCardContainer sx={{ maxWidth: 345,margin:"auto" }} onClick={()=>handleNavigation(path)}>
            <Image src={productImage} style={{width:"100%",height:"100%"}} alt='productImage' width={100} height={100} priority/>
            <CardContent>
                <Typography component={"div"} variant="body2" sx={{ color: 'text.secondary' }}>{productSubTitle}</Typography>
                <Box className="priceContainer">
                    <Typography className='productTitle'>{productTitle}</Typography>
                    <Typography className='productPrice'>&#8377;{productPrice}</Typography>
                </Box>
            </CardContent>
        </ProductCardContainer>
    )
}

export default ProductCard
const ProductCardContainer = styled(Card)({
    margin: "auto !important",
    cursor:"pointer",
    "& .priceContainer":{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"start",
        width:"100%",
        border:"1px solid #fff"
    },
    "& .productPrice":{
        color:"gray"
    },
    "& .productTitle":{
        color:"#00000"
    },
})