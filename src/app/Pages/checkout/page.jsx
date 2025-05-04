"use client"
import { Box, Button, Divider, FormControl, Grid, InputLabel, List, ListItem, MenuItem, Radio, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomInput from '@/app/Components/CustomInput';
import { Country, State, City } from 'country-state-city';
import CustomButton from '@/app/Components/CustomButton';
import Link from 'next/link';
import WithLayout from '@/app/HOC/WithLayout';
const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
const Checkout = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({})
  const [countries, setCountries] = useState(Country.getAllCountries())
  const [cities, setCities] = useState([])
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
  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };
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
  const PaymentsTab = () => {
    const [selectedMethod, setSelectedMethod] = useState("credit");

    // Payment options
    const paymentMethods = [
      { id: "credit", label: "Credit Card" },
      { id: "debit", label: "Debit Card" },
      { id: "upi", label: "UPI" },
    ];
    return <Box>
      <OrderCardContainer>
        {/* Order Info */}
        <Box className="order-info">
          <Typography className="order-id">
            Order <b>#1646988613_694623663</b>
          </Typography>
          <Box className="price">
            69 <Typography className="currency">$</Typography>
          </Box>
        </Box>

        {/* Description Section */}
        <Box className="description">
          <Typography className="description-title">Description</Typography>
          <Typography variant="body2">Order description</Typography>
        </Box>
      </OrderCardContainer>
      <PaymentContainer>
        <Typography className="payment-title">Select a payment method:</Typography>

        {/* Payment Options List */}
        <List className="payment-list">
          {paymentMethods.map(({ id, label }) => (
            <Box key={id}>
              {/* Payment Option */}
              <ListItem
                className="payment-option"
                onClick={() => setSelectedMethod(id === selectedMethod ? null : id)}
              >
                <Radio checked={selectedMethod === id} />
                <Typography>{label}</Typography>
              </ListItem>

              {/* Show Form Only if Selected */}
              {selectedMethod === id && (
                <Box className="payment-form">
                  {id === "upi" ? (
                    <TextField
                      fullWidth
                      label="Enter UPI ID"
                      variant="outlined"
                      className="input-field"
                    />
                  ) : (
                    <>
                      <TextField
                        fullWidth
                        label="Card Number"
                        variant="outlined"
                        className="input-field"
                      />
                      <Box display="flex" gap={2}>
                        <TextField
                          fullWidth
                          label="MM / YY"
                          variant="outlined"
                          className="input-field"
                        />
                        <TextField
                          fullWidth
                          label="CVV"
                          variant="outlined"
                          className="input-field"
                        />
                      </Box>
                      <Typography variant="body2">
                        Data is protected under PCI DSS. We do not store your data.
                      </Typography>
                    </>
                  )}
                  <Button fullWidth className="pay-button">
                    Pay
                  </Button>
                </Box>
              )}
            </Box>
          ))}
        </List>
      </PaymentContainer>
    </Box>
  }
  const SelectedProductsList = ({product}) => {
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
  const OrderSummary=()=>{
    return<OrderSummaryContainer>
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

  return (
    <CheckoutContainer>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6} lg={6} order={{ xs: 2, md: 1 }}>
          <Box sx={{ width: "100%" }}>
            <Tabs value={tabIndex} onChange={handleChange}>
              <Tab label="Information" />
              <Tab label="Payments" />
            </Tabs>
            <TabPanel value={tabIndex} index={0}><InformationTab /></TabPanel>
            <TabPanel value={tabIndex} index={1}><PaymentsTab /></TabPanel>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} order={{ xs: 2, md: 1 }}>
          <OrderSummary/>
        </Grid>
      </Grid>
    </CheckoutContainer>
  )
}

export default WithLayout(Checkout)

const CheckoutContainer = styled(Box)({
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
const OrderCardContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  // width: "100%",
  padding: "16px",
  borderRadius: "12px",
  border: "1px solid #DDE2E5",

  "& .order-info": {
    display: "flex",
    flexDirection: "column",
  },

  "& .order-id": {
    fontSize: "16px",
  },

  "& .price": {
    display: "flex",
    alignItems: "center",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#1A1A1A",
  },

  "& .currency": {
    fontSize: "24px",
    fontWeight: "500",
    color: "#6B7280",
    marginLeft: "4px",
  },

  "& .description": {
    textAlign: "right",
  },

  "& .description-title": {
    fontWeight: "bold",
  },
});
const PaymentContainer = styled(Box)({
  padding: "16px",
  borderRadius: "12px",
  border: "1px solid #DDE2E5",
  background: "#fff",
  marginTop: "50px",
  "& .payment-title": {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "16px",
  },

  "& .payment-list": {
    borderBottom: "1px solid #DDE2E5",
  },

  "& .payment-option": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "12px",
    cursor: "pointer",
  },

  "& .payment-form": {
    marginTop: "8px",
    padding: "16px",
    borderRadius: "8px",
    background: "#F9FAFB",
  },

  "& .input-field": {
    marginBottom: "12px",
  },

  "& .pay-button": {
    marginTop: "12px",
    background: "#FFD700",
    color: "#000",
    fontWeight: "bold",
    "&:hover": {
      background: "#FFC107",
    },
  },
});
const StyledProductCard = styled(Box)({
  padding: "16px",
  borderBottom: "1px solid #e0e0e0",
  background: "#f9f9f9",
  borderRadius: "8px",
  display: "flex",
  alignItems: "flex-start",
  margin:"10px 0px",
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
  maxWidth: "600px",
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