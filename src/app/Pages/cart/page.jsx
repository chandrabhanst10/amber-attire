"use client"
import { Box, Typography, Button, Grid, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import CustomButton from "@/app/Components/CustomButton";
import WithLayout from "@/app/HOC/WithLayout";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Basic Heavy T-Shirt",
      color: "Black",
      size: "L",
      price: 99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Basic Fit T-Shirt",
      color: "Black",
      size: "L",
      price: 99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]);

  // Handle Quantity Increase
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Handle Quantity Decrease
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Handle Delete Item
  const deleteItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate Subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContainer>
      <Typography variant="h5" fontWeight="bold" margin={"20px 0px"}>Your Order</Typography>

      <CartList container spacing={{ xs: 1, sm: 1, md: 2, lg: 2 }}>
        {cartItems.map((item) => (
          <Grid item xs={12} key={item.id}>
            <StyledProductCard container spacing={2} alignItems="center">
              
              {/* Product Image */}
              <Grid item xs={3} sm={2}>
                <ProductImage src={item.image} alt={item.name} />
              </Grid>

              {/* Product Details */}
              <Grid item xs={5} sm={6}>
                <Typography fontWeight="bold">{item.name}</Typography>
                <Typography color="gray">{item.color} / {item.size}</Typography>
                <Typography fontWeight="bold">${(item.price * item.quantity).toFixed(2)}</Typography>
              </Grid>

              {/* Quantity & Delete Controls */}
              <Grid item xs={4} sm={4} display="flex" alignItems="center" justifyContent="flex-end">
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => decreaseQuantity(item.id)} size="small"><RemoveIcon /></IconButton>
                  <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                  <IconButton onClick={() => increaseQuantity(item.id)} size="small"><AddIcon /></IconButton>
                </Box>
                <IconButton onClick={() => deleteItem(item.id)} color="error"><DeleteIcon /></IconButton>
              </Grid>

            </StyledProductCard>
          </Grid>
        ))}
      </CartList>

      {/* Summary Section */}
      <SummarySection>
        <Grid container spacing={2}>
          <Grid item xs={6}><Typography fontWeight="bold">Subtotal</Typography></Grid>
          <Grid item xs={6} textAlign="right"><Typography fontWeight="bold">${subtotal.toFixed(2)}</Typography></Grid>

          <Grid item xs={6}><Typography fontWeight="bold">Shipping</Typography></Grid>
          <Grid item xs={6} textAlign="right"><Typography color="gray">Calculated at next step</Typography></Grid>

          <Grid item xs={6}><Typography variant="h6" fontWeight="bold">Total</Typography></Grid>
          <Grid item xs={6} textAlign="right"><Typography variant="h6" fontWeight="bold">${subtotal.toFixed(2)}</Typography></Grid>
        </Grid>
      </SummarySection>
      <CustomButton
        type={"submit"}
        label={" Proceed to Checkout"}
        fullWidth={true}
      />
    </CartContainer>
  );
};

export default WithLayout(CartScreen);

// Styled Components
const CartContainer = styled(Box)(({ theme }) => ({
  maxWidth: "900px",
  margin: "auto",
  padding: "20px",
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
  },
}));

const CartList = styled(Grid)({
  maxHeight: "500px",
  overflowY: "auto",
  "&::-webkit-scrollbar": { display: "none" },
  scrollbarWidth: "none",
  "-ms-overflow-style": "none",
});

const StyledProductCard = styled(Grid)(({ theme }) => ({
  padding: "16px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  alignItems: "center",
  width:"auto",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "row",
    padding: "8px",
  },
  margin:"10px 0px"
}));

const ProductImage = styled("img")(({ theme }) =>({
  width: "100px",
  height: "100px",
  objectFit: "fill",
  borderRadius: "8px",
  [theme.breakpoints.down("sm")]: {
    width: "70px",
    height: "90px",
  },
}));

const SummarySection = styled(Box)(({ theme }) => ({
  marginTop: "20px",
  padding: "16px",
  borderTop: "2px solid #000",
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
  },
}));
