"use client"
import WithLayout from '@/app/HOC/WithLayout'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const ProductDetails = () => {
  const { id } = useParams();
    let [productImages, setProductImages] = useState([
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1532693490338-2f188ebd96c9?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1595882669314-919b3d51f2c7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1586078130702-d208859b6223?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1586079615844-c0abfb04dc79?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1550063543-0ef938415c8b?q=80&w=3109&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ]);
  let [selectedImage, setSelectedImage] = useState();
  let [selectedColor, setSelectedColor] = useState();
  let [selectedSize, setSelectedSize] = useState();
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#F3FF33"];
  const sizes = ["XXS", "XS", "SM", "M", "LG"];
  const productName="Trending Cloths"
  const description = "This product is a Men's Cotton T-Shirt from Nike, available in Black, White, and Blue colors. It comes in multiple sizes, including S, M, L, and XL, and features a regular fit for all-day comfort. Made from 100% cotton, it offers a breathable and soft feel, making it ideal for casual wear. The t-shirt is machine washable, ensuring easy maintenance. It is currently in stock and eligible for fast delivery. Customers have rated it 4.5/5 stars, praising its comfort and durability."
  useEffect(() => {
    setSelectedImage(productImages[0])
    setSelectedColor(colors[0]);
    setSelectedSize("LG");
  }, [])
  const handleChangeImage = (image) => {
    setSelectedImage(image);
  };
  const handleColorSelect = (color) => {
    setSelectedColor(color)
  };
  const handleColorSize = (size) => {
    setSelectedSize(size)
  };
  return (
    <ProductDetailsContainer>
      <Box className="breadCrumpContainer">
      {/* <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography>
      </Breadcrumbs> */}
      </Box>
      <Grid container>
        <Grid item size={{xs:12, sm:12, md:6, lg:6,}}>
          <Box className={"leftContainer"}>
            <Box className='productDetailsMainImage' component={"img"} src={selectedImage} />
            <Box className="productSmallImagesContainer">
              <Grid container>
                {productImages.map((item, index) => {
                  return <Grid item xs={2} sm={12} md={12} lg={12} key={index}>
                    <Box>
                      <Box className={selectedImage !== item ? "productSmallImageBlur" : "productSmallImage"} component={"img"} src={item} onClick={() => handleChangeImage(item)} />
                    </Box>
                  </Grid>
                })}
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item  size={{xs:12, sm:12, md:6, lg:6,}}>
          <Box className={"rightContainer"}>
            <Box>
            <Typography className='productName'>{productName.length>50?productName.slice(0,150)+"...":productName}</Typography>
            <Typography className='productPrice'>${3300}</Typography>
            <Typography variant='subtitle2' className='productSubPrice'>MRP incl. of all taxes</Typography>
            </Box>
            <Typography className='productDetails'>{description.length>500?description.slice(0,500)+"...":description}</Typography>
            <Box>
              <Typography className='productPrice'>COLORS</Typography>
              <Box className={"colorContainer"}>
                {colors.map((item, index) => {
                  return <Box className={selectedColor === item ? "colorBoxActive" : "colorBox"} sx={{ backgroundColor: item }} key={index} onClick={() => { handleColorSelect(item) }} />
                })}
              </Box>
            </Box>
            <Box>
              <Typography className='productPrice'>SIZES</Typography>
              <Box className={"colorContainer"}>
                {sizes.map((item, index) => {
                  return <Box className={selectedSize === item ? "sizeBoxActive" : "sizeBox"} key={index} onClick={() => handleColorSize(item)}>{item}</Box>
                })}
              </Box>
            </Box>
            <Box sx={{ marginTop: "20px", flexDirection: "column", display: "flex", gap: "10px" }}>
              <Button className='buyNowBtn' fullWidth>But Now</Button>
              <Button variant='outlined' className='addToCartBtn' fullWidth>Add To Cart</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ProductDetailsContainer>
  )
}

export default WithLayout(ProductDetails)
const ProductDetailsContainer = styled(Box)({
  "& .breadCrumpContainer":{
    // padding
  },
  "& .leftContainer": {
    height: "582px",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    padding:"0px 20px",
    "@media (max-width: 599px)": {
      display: "flex",
      flexDirection: "column",
      height: "auto",
      padding:"0px 0px",
    },
  },
  "& .productDetailsMainImage": {
    display: "inline",
    borderRadius: "8px",
    width: "100%",
    height:"100%",
    "@media (max-width: 599px)": {
      height:"500px",
    },
  },
  "& .productSmallImagesContainer": {
    display: "inline",
    width: "min-content",
    "@media (max-width: 599px)": {
      display: "block",
      width:"100%"
    },
  },
  "& .productSmallImage": {
    width: "93px",
    height: "93px",
    borderRadius: "8px",
    "@media (max-width: 599px)": {
      width:"60px",
      height: "70px",
    },
  },
  "& .productSmallImageBlur": {
    width: "93px",
    height: "93px",
    borderRadius: "8px",
    filter: "blur(1px)",
    "@media (max-width: 599px)": {
      width:"60px",
      height: "70px",
    },
  },
  "& .productName": {
    fontSize: "26px",
    fontWeight: 400,
    color: "#4f4545"
  },
  "& .productPrice": {
    fontSize: "22px",
    fontWeight: 300,
    color: "gray"
  },
  "& .productSubPrice": {
    fontWeight: 300,
    color: "rgba(0, 0, 0, 0.5)"
  },
  "& .productDetails": {
    // marginTop: "25px"
  },
  "& .colorContainer": {
    display: "flex",
    gap: "5px"
  },
  "& .colorBox": {
    width: "40px",
    height: "40px",
    border: "1px solid transparent",
  },
  "& .colorBoxActive": {
    width: "40px",
    height: "40px",
    border: "1px solid black",
  },
  "& .sizeBox": {
    color: "gray",
    width: "40px",
    height: "40px",
    border: "1px solid gray",
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
  },
  "& .sizeBoxActive": {
    color: "black",
    width: "40px",
    height: "40px",
    border: "1px solid black",
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
  },
  "& .rightContainer":{
    display:"flex",
    justifyContent:"space-between",
    flexDirection:"column",
    height:"100%"
  },
  "& .buyNowBtn":{
    backgroundColor:"#D9D9D9",
    color:"black"
  }
})