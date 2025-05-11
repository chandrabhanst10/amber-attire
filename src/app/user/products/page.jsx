"use client"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox,  FormControlLabel, Grid, MenuItem, Select, Slider, Typography, } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductCard from '@/app/Components/ProductCard.jsx';
import ProductsData from "../../Utils/Products.js";
import TuneIcon from '@mui/icons-material/Tune';
import FilterDrawer from '@/app/Components/FilterDrawer.jsx';
import WithLayout from '@/app/HOC/WithLayout.js';
import { useSearchParams } from 'next/navigation.js';
const Products = () => {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');  
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [mobileFilterDrawer, setMobileFilterDrawer] = useState(false)
  const [productList, setProductList] = useState(ProductsData)
  const [sort, setSort] = React.useState('relevance');
  const handleMobileFilterDrawer = () => {
    setMobileFilterDrawer(!mobileFilterDrawer)
  };
  const handleFilterApply = () => { };
  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  const SideBar2 = () => {
    return (
      <SidebarWrapper>
        <Box className="sort-box">
          <Typography variant="body2" sx={{ fontWeight: 500, marginBottom: '8px' }}>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              size="small"
              sx={{ fontWeight: 600, fontSize: '0.9rem', minWidth: 120 }}
              fullWidth
            >
              <MenuItem value="relevance">Relevance</MenuItem>
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
              <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
            </Select>
          </Typography>
        </Box>
        <Accordion className="filter-section" sx={{
          boxShadow: 'none',
          borderBottom: 'none',
          borderTop: 'none',
          '&::before': {
            display: 'none',
          },
        }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={500} variant='caption'>SIZE</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box flexDirection={'column'} display={"flex"}>
              {['Xl', 'L', 'M', 'S'].map((item) => (
                <FormControlLabel
                  key={item}
                  control={<Checkbox />}
                  label={item}
                  className="checkbox-item"
                  name='size'
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion className="filter-section" sx={{
          boxShadow: 'none',
          borderBottom: 'none',
          borderTop: 'none',
          '&::before': {
            display: 'none',
          },
        }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={500} variant='caption'>PRICE</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Slider min={0} max={500} aria-label="Default" valueLabelDisplay="auto" onChangeCommitted={handlePriceRangeChange} />
              <Typography>
                ₹0 - ₹{priceRange}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </SidebarWrapper>
    )
  }
  const TopFiler = () => {
    return <Box className={"topFilterContainer"}>
      <Box className={"filterButtonContainer"}>
        <Button variant="outlined" startIcon={<TuneIcon />} onClick={handleMobileFilterDrawer}>
          Filters
        </Button>
      </Box>
      <FilterDrawer open={mobileFilterDrawer} onClose={handleMobileFilterDrawer} onApply={handleFilterApply} />
    </Box>
  }
  const AllProductsContainer = () => {
    return <Grid container spacing={2}>
      {productList.map((product, index) => {
        return <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
          <ProductCard
            productImage={product?.productImage}
            productTitle={product?.productTitle}
            productSubTitle={product?.productSubTitle}
            productPrice={product?.productPrice}
            productColorCount={product?.productColorCount}
            path={"/user/products/1"} />
        </Grid>
      })}
    </Grid>
  };
  return (
    <ProductsContainer>
      <Box className={"SideBarLeftContainer"}>
        <SideBar2 />
      </Box>
      <Box className="SideBarRightContainer">
        <TopFiler />
        <AllProductsContainer />
      </Box>
    </ProductsContainer>
  )
}

export default WithLayout(Products)
const ProductsContainer = styled(Box)({
  display: "flex",
  "& .divider": {
    margin: "20px 0px"
  },
  "& .SideBarLeftContainer": {
    width: "300px",
    height: "87vh",
    padding: "0px 20px",
    overflow: "scroll",
    "@media (max-width: 768px)": {
      display: "none"
    },
  },
  "& .sideBarTitle": {
    margin: "10px 0px",
    fontWeight: 300
  },
  "& .sizeButton": {
    padding: "2px",
  },
  "& .sizeActiveButton": {
    padding: "2px",
    backgroundColor: "#000",
    color: "#fff"
  },
  "& .SideBarLeftContainer": {
    height: "78vh",
    overflow: "scroll",
    width: "400px"
  },
  "& .SideBarRightContainer": {
    display: "block",
    height: "78vh",
    overflow: "scroll",
    width: "100%",
    "& .topFilterContainer": {
      display: "none",
      padding: "10px 0px",
      "& .filterButtonContainer": {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%"
      },
      "@media (max-width: 768px)": {
        display: "flex",
      },
    }
  },
  "& .checkBoxLabel": {
    fontFamily: '"Noto Sans PhagsPa", serif',
  },
})
const SidebarWrapper = styled('div')({
  width: '260px',
  padding: '16px',
  borderRight: '1px solid #e0e0e0',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  fontFamily: 'sans-serif',
  fontSize: '14px',
});