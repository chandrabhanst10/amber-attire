"use client"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, Checkbox, Divider, FormControlLabel, FormGroup, Grid, InputAdornment, List, ListItem, ListItemButton, ListItemText, Slider, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductCard from '@/app/Components/ProductCard.jsx';
import ProductsData from "../../Utils/Products.js";
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import FilterDrawer from '@/app/Components/FilterDrawer.jsx';
import WithLayout from '@/app/HOC/WithLayout.js';
const Products = () => {
  const [size, setSize] = useState("XS");
  const [filterAvailability, setFilterAvailability] = useState(false);
  const [filterOutOfStock, setFilterOutOfStock] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [expanded, setExpanded] = useState(false);
  const [searchText, setSearchText] = useState("")
  const isMobile = useMediaQuery('(max-width:600px)');
  const [mobileFilterDrawer, setMobileFilterDrawer] = useState(false)
  const [categories, setCategories] = useState({
    tops: false,
    bottoms: false,
    dresses: false,
    outerwear: false,
    activewear: false,
    footwear: false,
    accessories: false,
    swimwear: false,
    lingerieSleepwear: false,
    maternityWear: false,
  });
  const [colors, setColors] = useState({
    red: false,
    blue: false,
    green: false,
    yellow: false,
    black: false,
    white: false,
    pink: false,
    purple: false,
    gray: false,
    beige: false,
    orange: false,
    brown: false,
  });
  const colorOptions = [
    { name: 'red', displayName: 'Red', colorCode: 'red' },
    { name: 'blue', displayName: 'Blue', colorCode: 'blue' },
    { name: 'green', displayName: 'Green', colorCode: 'green' },
    { name: 'yellow', displayName: 'Yellow', colorCode: 'yellow' },
    { name: 'black', displayName: 'Black', colorCode: 'black' },
    { name: 'white', displayName: 'White', colorCode: '#f5f5f5' },
    { name: 'pink', displayName: 'Pink', colorCode: 'pink' },
    { name: 'purple', displayName: 'Purple', colorCode: 'purple' },
    { name: 'gray', displayName: 'Gray', colorCode: 'gray' },
    { name: 'beige', displayName: 'Beige', colorCode: '#f5deb3' },
    { name: 'orange', displayName: 'Orange', colorCode: 'orange' },
    { name: 'brown', displayName: 'Brown', colorCode: 'brown' },
  ];

  const handleSize = (size) => {
    setSize(size)
  }
  const handleAvailability = (event) => {
    setFilterAvailability(event.target.checked)
  };
  const handleOutOfStock = (event) => {
    setFilterOutOfStock(event.target.checked)
  };
  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
    setCategories((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  const handleChange = (event) => {
    const { name, checked } = event.target;
    setColors((prev) => ({ ...prev, [name]: checked }));
  };
  const handleCheckboxClick = (event) => {
    event.stopPropagation();
  };
  const handlePriceRangeChange = (event, newValue) => {
    event.stopPropagation();
    setPriceRange(newValue);
  };
  const handleAccordionToggle = (event, isExpanded) => {
    setExpanded(isExpanded);
  };
  const handleMobileFilterDrawer = () => {
    setMobileFilterDrawer(!mobileFilterDrawer)
  };
  const handleFilterApply = () => { };

  const SideBar = () => {
    return <Box className="SideBarLeftContainer" >
      {/* <Box sx={{display:'flex',justifyContent:"flex-end",alignItems:"center"}}>
          {
            openDrawer ?<IconButton onClick={()=>setOpenDrawer(false)}><ArrowForwardIosIcon/></IconButton>:<IconButton onClick={handleDrawer}><ArrowBackIosNewIcon/></IconButton>
          }
        </Box> */}
      <Typography className='sideBarTitle' variant='h5'>Filters</Typography>
      <ButtonGroup variant="outlined" aria-label="Basic button group" sx={{ marginBottom: "20px" }}>
        <Button onClick={() => handleSize("XS")} className={size === "XS" ? `sizeActiveButton` : `sizeButton`}>XS</Button>
        <Button onClick={() => handleSize("S")} className={size === "S" ? `sizeActiveButton` : `sizeButton`}>S</Button>
        <Button onClick={() => handleSize("M")} className={size === "M" ? `sizeActiveButton` : `sizeButton`}>M</Button>
        <Button onClick={() => handleSize("L")} className={size === "L" ? `sizeActiveButton` : `sizeButton`}>L</Button>
        <Button onClick={() => handleSize("XL")} className={size === "XL" ? `sizeActiveButton` : `sizeButton`}>XL</Button>
        <Button onClick={() => handleSize("2X")} className={size === "2X" ? `sizeActiveButton` : `sizeButton`}>2X</Button>
      </ButtonGroup>
      {/* <Divider className='divider' /> */}
      <Accordion style={{ background: "transparent", boxShadow: "none" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ background: "transparent" }}>
          Availability
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel className='checkBoxLabel' control={<Checkbox checked={filterAvailability} onChange={handleAvailability} />} label="Availability    (450)" />
            <FormControlLabel className='checkBoxLabel' control={<Checkbox checked={filterOutOfStock} onChange={handleOutOfStock} />} label="Out Of Stack  (18)" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ background: "transparent", boxShadow: "none" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ background: "transparent" }}>
          Category
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel control={<Checkbox name="tops" checked={categories.tops} onChange={handleCategoryChange} />} label="Tops" />
            <FormControlLabel control={<Checkbox name="bottoms" checked={categories.bottoms} onChange={handleCategoryChange} />} label="Bottoms" />
            <FormControlLabel control={<Checkbox name="dresses" checked={categories.dresses} onChange={handleCategoryChange} />} label="Dresses" />
            <FormControlLabel control={<Checkbox name="outerwear" checked={categories.outerwear} onChange={handleCategoryChange} />} label="Outerwear" />
            <FormControlLabel control={<Checkbox name="activewear" checked={categories.activewear} onChange={handleCategoryChange} />} label="Activewear" />
            <FormControlLabel control={<Checkbox name="footwear" checked={categories.footwear} onChange={handleCategoryChange} />} label="Footwear" />
            <FormControlLabel control={<Checkbox name="accessories" checked={categories.accessories} onChange={handleCategoryChange} />} label="Accessories" />
            <FormControlLabel control={<Checkbox name="swimwear" checked={categories.swimwear} onChange={handleCategoryChange} />} label="Swimwear" />
            <FormControlLabel control={<Checkbox name="lingerieSleepwear" checked={categories.lingerieSleepwear} onChange={handleCategoryChange} />} label="Lingerie & Sleepwear" />
            <FormControlLabel control={<Checkbox name="maternityWear" checked={categories.maternityWear} onChange={handleCategoryChange} />} label="Maternity Wear" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ background: "transparent", boxShadow: "none" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ background: "transparent" }}>
          Colors
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <Grid container spacing={2}>
              {colorOptions.map((color, index) => {
                return <Grid key={index} item  size={{xs:4, sm:4, md:4, lg:4,}}>
                  <FormControlLabel
                  key={color.name}
                  control={<Checkbox name={color.name} checked={colors[color.name]} onChange={handleChange} />}
                  onClick={handleCheckboxClick}
                  label={
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: color.colorCode,
                        border: '1px solid #ccc',
                        display: 'inline-block',
                        marginLeft: '10px',
                      }}
                      title={color.displayName}
                    />
                  }
                /></Grid>
              })}
            </Grid>
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ background: "transparent", boxShadow: "none" }} expanded={expanded}
        onChange={handleAccordionToggle}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ background: "transparent" }}>
          Price Range
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Slider
              value={priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              sx={{ color: '#1976d2' }}
              max={5000}
              step={100}
              disableSwap
            />
            <Typography>
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
    // </Drawer>
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
      {ProductsData.map((product, index) => {
        return <Grid key={index} item size={{xs:12, sm:6, md:4, lg:4}}>
          <ProductCard productImage={product.productImage} productSubTitle={product.productSubTitle} productTitle={product.productTitle} productPrice={product.productPrice} productColorCount={product.productColorCount} path={"/Pages/products/1"}/>
        </Grid>
      })}
    </Grid>
  };
  const filteredProducts = ProductsData.filter((product) =>
    product.productTitle.toLowerCase().includes(searchText.toLowerCase())
  );
  const ProductsTop = () => {
    return <Box sx={{ display: "flex", gap: "20px", position: "relative" }}>
      <TextField
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
          },
        }}
        fullWidth
        sx={{ marginBottom: "20px" }}
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
      {searchText.length > 0 && <Box sx={{ position: "absolute", marginTop: "55px", border: "1px solid red", width: "100%", backgroundColor: "#fff",zIndex:99 }}>
        <List>
          {filteredProducts.map((product, index) => {
            return <div key={index}>
              <ListItem >
                <ListItemButton>
                  <ListItemText primary={product.productTitle} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          })}
        </List>
      </Box>}
    </Box>
  }
  return (
    <ProductsContainer>
      <Box>
        <SideBar />
      </Box>
      <Box className="SideBarRightContainer">
        <ProductsTop />
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
  "& .SideBarRightContainer": {
    display: "block",
    height: "87vh",
    overflow: "scroll",
    width: "100%",
    "& .topFilterContainer": {
      display: "none",
      padding:"10px 0px",
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