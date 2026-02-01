"use client"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, FormControlLabel, Grid, MenuItem, Select, Slider, Typography, } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductCard from '../../Components/ProductCard';
import ProductCardSkeleton from '../../Components/skeletons/ProductCardSkeleton';
import TuneIcon from '@mui/icons-material/Tune';
import FilterDrawer from '../../Components/FilterDrawer';
import { useGetTaggedIProductsQuery, useGetIProductsQuery } from '../../redux/apiSlice';
import { useParams } from 'react-router-dom';
import UserLayout from '../../layout';
import { IProduct } from '../../types';
const Products: React.FC = () => {
  const { tag } = useParams<{ tag: string }>();
  const [priceRange, setPriceRange] = useState<number[]>([0, 0]);
  const [mobileFilterDrawer, setMobileFilterDrawer] = useState<boolean>(false);
  const [sort, setSort] = React.useState<string>('relevance');

  // Use RTK Query
  const { data: taggedData, isLoading: tagLoading } = useGetTaggedIProductsQuery(tag || "", { skip: !tag });
  const { data: allData, isLoading: allLoading } = useGetIProductsQuery("", { skip: !!tag });
  const productList = tag ? (taggedData?.data || []) : (allData?.data || []);
  const isLoading = tag ? tagLoading : allLoading;

  // Keep getTagData as empty or remove usage if possible, but existing code used effect.
  // We can remove the effect.

  const handleMobileFilterDrawer = () => {
    setMobileFilterDrawer(!mobileFilterDrawer)
  };
  const handleFilterApply = () => { };
  const handlePriceRangeChange = (event: Event | React.SyntheticEvent, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };
  const SideBar2 = () => {
    return (
      <SidebarWrapper>
        <Box className="sort-box">
          {/* <Typography variant="body2" sx={{ fontWeight: 500, marginBottom: '8px' }}> */}
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
          {/* </Typography> */}
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
    if (isLoading) {
      return (
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid key={item} size={{ xs: 6, sm: 6, md: 4, lg: 4 }}>
              <ProductCardSkeleton />
            </Grid>
          ))}
        </Grid>
      )
    }

    return <Grid container spacing={2}>
      {productList.map((product: IProduct, index: number) => {
        return <Grid key={index} size={{ xs: 6, sm: 6, md: 4, lg: 4 }}>
          <ProductCard
            productImage={product?.images?.[0] || ""}
            productTitle={product?.shortDescription}
            productSubTitle={product?.productName}
            productPrice={product?.price}
            productColorCount={product?.productColorCount}
            path={`/user/products/${product._id}`} />
        </Grid>
      })}
    </Grid>
  };
  return (
    <UserLayout>
      <ProductsContainer>
        <Box className={"SideBarLeftContainer"}>
          <SideBar2 />
        </Box>
        <Box className="SideBarRightContainer">
          <TopFiler />
          <AllProductsContainer />
        </Box>
      </ProductsContainer>
    </UserLayout>
  )
}

export default Products
const ProductsContainer = styled(Box)({
  display: "flex",
  gap: "10px",
  "& .divider": {
    margin: "20px 0px"
  },
  "& .SideBarLeftContainer": {
    width: "300px",
    height: "87vh",
    padding: "0px 20px",
    overflow: "scroll",

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

  "& .SideBarRightContainer": {
    display: "block",
    height: "90vh",
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
  "@media (max-width: 768px)": {
    "& .SideBarLeftContainer": {
      display: "none",
    }
  },
});

const SidebarWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  fontFamily: 'sans-serif',
  fontSize: '14px',
});