"use client"
import { Box, Divider, FormControl, Grid, InputLabel, MenuItem, Modal, Paper, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CustomInput from '@/app/Components/CustomInput';
import { Country, State, City } from 'country-state-city';
import CustomButton from '@/app/Components/CustomButton';
import WithLayout from '@/app/HOC/WithLayout';

const Checkout = () => {
  const [formData, setFormData] = useState({})
  const [countries, setCountries] = useState(Country.getAllCountries())
  const [cities, setCities] = useState([])
  const [addAddressModal, setAddAddressModal] = useState(false)
  const products = [
    {
      id: 1,
      title: "Basic Heavy T-Shirt",
      size: "Black / L",
      price: 99,
      quantity: 1,
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Basic Fit T-Shirt",
      size: "Black / L",
      price: 99,
      quantity: 1,
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Basic Fit T-Shirt",
      size: "Black / L",
      price: 99,
      quantity: 1,
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Basic Fit T-Shirt",
      size: "Black / L",
      price: 99,
      quantity: 1,
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Basic Fit T-Shirt",
      size: "Black / L",
      price: 99,
      quantity: 1,
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Basic Fit T-Shirt",
      size: "Black / L",
      price: 99,
      quantity: 1,
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Basic Fit T-Shirt",
      size: "Black / L",
      price: 99,
      quantity: 1,
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  useEffect(() => {
    const filtered = State.getAllStates().filter((city) => city.countryCode === "IN");
    setCities(filtered);
  }, [])
  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleClose = () => {
    setAddAddressModal(!addAddressModal)
  }
  const InformationTab = () => {
    return <Box>
      <form className="signUpBox" >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant='h6' className='signUpTitle'>Contact Information</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CustomInput
              label="Email"
              value={formData.email}
              name="email"
              onChange={handleOnchange}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CustomInput
              type='number'
              label="Phone"
              value={formData.phone}
              name="phone"
              onChange={handleOnchange}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant='h6' className='signUpTitle'>Shipping Address</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CustomInput
              label="First Name"
              value={formData.firstName}
              name="firstName"
              onChange={handleOnchange}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CustomInput
              label="Last Name"
              value={formData.lastName}
              name="lastName"
              onChange={handleOnchange}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Country"
                value={formData.country}
                name="country"
                onChange={handleOnchange}
                required={true}
              >
                {countries.map((country, index) => {
                  return <MenuItem value={country.isoCode} key={index}>{country.name}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="State"
                value={formData.state}
                name="state"
                onChange={handleOnchange}
                required={true}
              >
                {cities.map((city, index) => {
                  return <MenuItem value={city?.name} key={index}>{city?.name}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CustomInput
              label="Address"
              value={formData.address}
              name="address"
              onChange={handleOnchange}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CustomInput
              label="City"
              value={formData.city}
              name="city"
              onChange={handleOnchange}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CustomInput
              label="Post Code"
              value={formData.postalCode}
              name="postalCode"
              onChange={handleOnchange}
              rrequired={true}
              type='number'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CustomButton
              type={"submit"}
              label={"Next"}
            />
          </Grid>
        </Grid>

      </form>

    </Box>
  }
  const SelectedProductsList = ({ product }) => {
    return <StyledProductCard key={product.id}>
      <Grid container spacing={1}>
        <Grid item xs={3} sm={2}>
          <img src={product?.img} alt={product.title} className="product-image" />
        </Grid>
        <Grid item xs={6} sm={7} className="product-details">
          <Typography className="product-title">{product.title}</Typography>
          <Typography className="product-color-size">{product.size}</Typography>
          <Typography className="product-quantity">({product.quantity})</Typography>
        </Grid>
        <Grid item xs={3} sm={3} className="product-right">
          <Typography className="product-price">${product.price}</Typography>
        </Grid>
      </Grid>
    </StyledProductCard>
  }
  const OrderSummary = () => {
    return <OrderSummaryContainer >
      <Typography variant="h6" fontWeight="bold">
        YOUR ORDER
      </Typography>
      <ProductListContainer>
        {products.map((product) => (
          <SelectedProductsList product={product} />
        ))}
      </ProductListContainer>
      <Divider />
      <Grid container justifyContent="space-between" mt={2}>
        <Typography fontWeight="bold">Subtotal</Typography>
        <Typography>${products.reduce((sum, p) => sum + p.price * p.quantity, 0)}.00</Typography>
      </Grid>
      <Grid container justifyContent="space-between" mt={1}>
        <Typography fontWeight="bold">Shipping</Typography>
        <Typography color="gray">Calculated at next step</Typography>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Grid container justifyContent="space-between">
        <Typography fontWeight="bold">Total</Typography>
        <Typography fontWeight="bold">${products.reduce((sum, p) => sum + p.price * p.quantity, 0)}.00</Typography>
      </Grid>
    </OrderSummaryContainer>
  }
  const AddAddressModal = () => {
    return <AddAddressModalContainer>
      <Modal
        open={addAddressModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <InformationTab />
        </Box>
      </Modal>
    </AddAddressModalContainer>
  }

  return (
    <CheckoutContainer>
      <Box sx={{ width: { xs: "100%", lg: "50%" } }}>
        <Paper>

        <OrderSummary />
        <AddAddressModal />
        </Paper>
      </Box>
    </CheckoutContainer>
  )
}

export default WithLayout(Checkout)

const CheckoutContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  display: "flex",
  overflowY: "auto",
  maxHeight: "800px",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
  "-ms-overflow-style": "none",
  "& .signUpBox": {
    width: "100%",
    "@media (max-width: 991px)": {
      width: "100%",
      padding: "10px",
    },
  },
  "& .signUpTitle": {
    color: "#626262"
  },
  "& .forgotPasswordText": {
    color: "#626262",
    marginTop: "10px",
    textAlign: "end",
    width: "100%",
    display: "block"
  },
  "& .redirectLink": {
    color: "#a7a5a5",
    display: "flex",
    marginTop: "20px",
    justifyContent: "center",
    cursor: "none"
  },
  "& .registerLink": {
    color: "#626262",
    cursor: "pointer"
  }
})
const StyledProductCard = styled(Box)({
  padding: "16px",
  borderBottom: "1px solid #e0e0e0",
  background: "#f9f9f9",
  borderRadius: "8px",
  display: "flex",
  alignItems: "flex-start",
  margin: "10px 0px",
  "& .product-image": {
    width: "100%",
    maxHeight: "100px",
    borderRadius: "8px",
  },

  "& .product-details": {
    flexGrow: 1,
    paddingLeft: "16px",
  },

  "& .product-title": {
    fontWeight: "bold",
  },

  "& .product-color-size": {
    color: "gray",
  },

  "& .product-quantity": {
    color: "gray",
    fontWeight: "bold",
  },

  "& .product-right": {
    textAlign: "right",
  },

  "& .product-price": {
    fontWeight: "bold",
  },

  "& .change-link": {
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});
const OrderSummaryContainer = styled(Box)({
  margin: "auto",
  padding: "20px",
  background: "#fff",
});
const ProductListContainer = styled(Box)({
  maxHeight: "480px",
  overflowY: "auto",
  marginBottom: "16px",
  /* Hide scrollbar for Chrome, Safari, and Edge */
  "&::-webkit-scrollbar": {
    display: "none",
  },

  /* Hide scrollbar for Firefox */
  scrollbarWidth: "none",

  /* Hide scrollbar for IE, Edge, and other legacy browsers */
  "-ms-overflow-style": "none",
});
const AddAddressModalContainer = styled(Box)({

})