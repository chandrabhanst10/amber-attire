"use client"
import "./globals.css"
import { Box, Tab, Tabs, Typography, Grid } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import ProductCard from '@/app/Components/ProductCard';
import { Product1, Product2, Product3, Home1, Home2, Home3, Home4 } from '@/app/Assets';
import WithLayout from "./HOC/WithLayout"
import Image from "next/image"
const HomePage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [productList, setProductList] = useState([
    {
      productImage: Product1,
      productSubTitle: "V-Neck T-Shirt",
      productTitle: "Embroidered Seersucker Shirt",
      productPrice: "99",
      productColorCount: 4,
    },
    {
      productImage: Product2,
      productSubTitle: "V-Neck T-Shirt",
      productTitle: "Embroidered Seersucker Shirt",
      productPrice: "99",
      productColorCount: 4,
    },
    {
      productImage: Product3,
      productSubTitle: "V-Neck T-Shirt",
      productTitle: "Embroidered Seersucker Shirt",
      productPrice: "99",
      productColorCount: 4,
    },
    {
      productImage: Product1,
      productSubTitle: "V-Neck T-Shirt",
      productTitle: "Embroidered Seersucker Shirt",
      productPrice: "99",
      productColorCount: 4,
    },
    {
      productImage: Product2,
      productSubTitle: "V-Neck T-Shirt",
      productTitle: "Embroidered Seersucker Shirt",
      productPrice: "99",
      productColorCount: 4,
    },
    {
      productImage: Product3,
      productSubTitle: "V-Neck T-Shirt",
      productTitle: "Embroidered Seersucker Shirt",
      productPrice: "99",
      productColorCount: 4,
    },
  ]);
  const [showMore, setShowMore] = useState(3)
  let settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };
  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };
  const handleShowMore = () => {
    let size = productList.length === showMore ? 3 : productList.length
    setShowMore(size)
  }
  const Section1 = () => {
    return <>
      <Box>
        <Typography className='productsHeading'  width={250} lineHeight={1} my={2} sx={{fontSize:{xs:"20px",sm:"20px",md:"28px",lg:"32px"}}}>New This week</Typography>
        <Box>
          <Slider {...settings}>
            <div>
              <ProductCard productImage={Product1} productSubTitle={"V-Neck T-Shirt"} productTitle={"Embroidered Seersucker Shirt"} productPrice={"99"} productColorCount={4} path={"/user/products?tag=latest"}/>
            </div>
            <div>
              <ProductCard productImage={Product2} productSubTitle={"V-Neck T-Shirt"} productTitle={"Embroidered Seersucker Shirt"} productPrice={"99"} productColorCount={4} path={"/user/products?tag=latest"}/>
            </div>
            <div>
              <ProductCard productImage={Product3} productSubTitle={"V-Neck T-Shirt"} productTitle={"Embroidered Seersucker Shirt"} productPrice={"99"} productColorCount={4} path={"/user/products?tag=latest"}/>
            </div>
            <div>
              <ProductCard productImage={Product1} productSubTitle={"V-Neck T-Shirt"} productTitle={"Embroidered Seersucker Shirt"} productPrice={"99"} productColorCount={4} path={"/user/products?tag=latest"}/>
            </div>
            <div>
              <ProductCard productImage={Product2} productSubTitle={"V-Neck T-Shirt"} productTitle={"Embroidered Seersucker Shirt"} productPrice={"99"} productColorCount={4} path={"/user/products?tag=latest"}/>
            </div>
            <div>
              <ProductCard productImage={Product3} productSubTitle={"V-Neck T-Shirt"} productTitle={"Embroidered Seersucker Shirt"} productPrice={"99"} productColorCount={4} path={"/user/products?tag=latest"}/>
            </div>
          </Slider>
        </Box>
      </Box>
    </>
  }
  const TabPanel = ({ children, value, index }) => {
    return (
      <div hidden={value !== index}>
        {value === index && (
          <Box p={3}>
            <>{children}</>
          </Box>
        )}
      </div>
    );
  };
  const AllCloths = () => {
    return <>
      <Grid container spacing={2}>
        {productList.slice(0, showMore).map((item, index) => {
          return <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={index}>
            <ProductCard productImage={item.productImage} productSubTitle={item.productSubTitle} productTitle={item.productTitle} productPrice={item.productPrice} productColorCount={item.productColorCount} path={"/user/products"}/>
          </Grid>
        })}
      </Grid>
    </>
  }
  const MensCloths = () => {
    return <>
      <Grid container spacing={2}>
        {productList.slice(0, showMore).map((item, index) => {
          return <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={index}>
            <ProductCard productImage={item.productImage} productSubTitle={item.productSubTitle} productTitle={item.productTitle} productPrice={item.productPrice} productColorCount={item.productColorCount} />
          </Grid>
        })}
      </Grid>
    </>
  }
  const WomenCloths = () => {
    return <>
      <Grid container spacing={2}>
        {productList.slice(0, showMore).map((item, index) => {
          return <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={index}>
            <ProductCard productImage={item.productImage} productSubTitle={item.productSubTitle} productTitle={item.productTitle} productPrice={item.productPrice} productColorCount={item.productColorCount} />
          </Grid>
        })}
      </Grid>
    </>
  }
  const KidsCloths = () => {
    return <>
      <Grid container spacing={2}>
        {productList.slice(0, showMore).map((item, index) => {
          return <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={index}>
            <ProductCard productImage={item.productImage} productSubTitle={item.productSubTitle} productTitle={item.productTitle} productPrice={item.productPrice} productColorCount={item.productColorCount} />
          </Grid>
        })}
      </Grid>
    </>
  }
  const Section2 = () => {
    return <>
      <Box sx={{ padding: "20px 0px" }}>
        <Typography className='productsHeading' sx={{fontSize:{xs:"20px",sm:"20px",md:"28px",lg:"32px"}}} width={150} lineHeight={1} my={2}>XIV Collections 24-25</Typography>
        <Box>
          <Tabs value={tabIndex} onChange={handleChange}>
            <Tab label="All" />
            <Tab label="Mens" />
            <Tab label="Women" />
            <Tab label="Kid" />
          </Tabs>
          <TabPanel value={tabIndex} index={0}><AllCloths /></TabPanel>
          <TabPanel value={tabIndex} index={1}><MensCloths /></TabPanel>
          <TabPanel value={tabIndex} index={2}><WomenCloths /></TabPanel>
          <TabPanel value={tabIndex} index={3}><KidsCloths /></TabPanel>
        </Box>
        <Typography align="center" variant="subtitle2" onClick={handleShowMore} sx={{cursor:"pointer"}}>{showMore===3?<>Show More</>:<>Show Less</>}</Typography>
      </Box>
    </>
  }
  const Section3 = () => {
    return <>
      <ApproachSection>
        <Heading variant="h4"  my={2} sx={{fontSize:{xs:"20px",sm:"20px",md:"28px",lg:"32px"}}}>OUR APPROACH TO FASHION DESIGN</Heading>
        <Subheading>
          at elegant vogue ,we blend creativity with craftsmanship to create fashion that transcends trends and stands the test of time
          each design is meticulously crafted, ensuring the highest quality exquisite finish
        </Subheading>
        <Box sx={{ height: { xs: "auto", lg: "400px" }, marginTop: "150px" }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
              <Box sx={{ marginTop: { xs: "0px", lg: "-100px" } }}>
                <Image priority src={Home1} alt='productImage' width={300} height={350} style={{ width: '100%' }} />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
              <Box sx={{ marginBottom: { xs: "0px", lg: "-100px" } }}>
                <Image priority src={Home2} alt='productImage' width={300} height={350} style={{ width: '100%' }} />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
              <Box sx={{ marginTop: { xs: "0px", lg: "-100px" } }}>
                <Image priority src={Home3} alt='productImage' width={300} height={350} style={{ width: '100%' }} />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
              <Box sx={{ marginBottom: { xs: "0px", lg: "-100px" } }}>
                <Image priority src={Home4} alt='productImage' width={300} height={350} style={{ width: '100%' }} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ApproachSection>
    </>
  }
  return (
    <HomePageContainer>
      <Section1 />
      <Section2 />
      <Section3 />
    </HomePageContainer>
  )
}

export default WithLayout(HomePage)
const HomePageContainer = styled(Box)({
  width: "100%",
  "& .searchField  .MuiOutlinedInput-root": {
    borderRadius: "30px",
  },

});
const ApproachSection = styled("section")`
  padding: 60px 20px;
  text-align: center;
  background-color: #f9f9f9;
`;
const Heading = styled(Typography)`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
`;
const Subheading = styled(Typography)`
  font-size: 1rem;
  max-width: 700px;
  margin: 0 auto 40px;
  line-height: 1.6;
  color: #555;
`;
