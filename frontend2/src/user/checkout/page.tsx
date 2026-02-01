"use client";
import { Box, Card, CardContent, Divider, FormControl, Grid, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { getCheckoutFromCart } from "../../redux/slices/checkout";
import AddAddressModal from "../address/components/AddAddressModal";
import { addAddress, AddressData, getAllAddresses } from "../../redux/slices/addressSlice";
import { AppDispatch } from "../../redux/store";
import { createOrder, verifyPayment } from "../../redux/slices/paymentSlice";
import { toast } from "react-toastify";
import UserLayout from "../../layout";

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { checkoutItems, loading } = useSelector((state: any) => state.checkout);
  const { addresses } = useSelector((state: any) => state.address);
  const { user } = useSelector((state: any) => state.user);
  const [openAddAddressModal, setOpenAddAddressModal] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<AddressData>()
  useEffect(() => {
    dispatch(getAllAddresses());
  }, [dispatch]);

  useEffect(() => {
    setSelectedAddress(addresses[0])
  }, [addresses]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => setRazorLoaded(true);
      document.body.appendChild(script);
    }
  }, []);

  const handleAddAddressModal = () => {
    setOpenAddAddressModal(!openAddAddressModal)
  };

  const handleProceedToPayment = async () => {
    try {
      // Calculate total amount
      const totalAmount = checkoutItems.items.reduce(
        (sum: number, item: { discountPrice: any; price: any; quantity: any; }) => sum + (item.discountPrice || item.price) * (item.quantity || 1),
        0
      );

      const res = await dispatch(createOrder({ products: checkoutItems.items, amount: totalAmount }));
      const order = await res.payload;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
        amount: order.amount,
        currency: order.currency,
        name: "Aanga Attire",
        description: "Payment for your Aanga Attire order",
        order_id: order.orderId,
        handler: async function (response: any) {
          const verifyRes = await dispatch(
            verifyPayment({
              orderId: order.orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              shippingAddress: "",
              email: user.email,    // if you have it saved
              phone: user.phone
            })
          );

          if (verifyRes.payload.success) {
            toast.success("Payment Successful!");
          } else {
            toast.error("Payment Failed!");
          }
        },
        theme: { color: "#3399cc" },
        method: { upi: true },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error during payment initiation:", err);
      toast.error("Something went wrong while processing payment.");
    }
  };


  const SelectedProductsList = ({ product, index }: { product: any, index: any }) => (
    <StyledProductCard key={product.id}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 3 }}>
          <img src={product.images?.[index] || ""} alt={product.title} className="product-image" />
        </Grid>
        <Grid size={{ xs: 6 }} className="product-details">
          <Typography className="product-title">{product.productName}</Typography>
          <Typography className="product-color-size">Size: {product.sizes[index]}</Typography>
          <Typography className="product-quantity">Quantity: ({product.quantity})</Typography>
        </Grid>
        <Grid size={{ xs: 3 }} className="product-right">
          <Typography className="product-price">${product.discountPrice}</Typography>
        </Grid>
      </Grid>
    </StyledProductCard>
  );

  const handleAddAddress = async (event: React.FormEvent<HTMLFormElement>, formData: any) => {
    event.preventDefault();
    await dispatch(addAddress(formData));
    setOpenAddAddressModal(false);
  };

  const handleSelectAddress = (address: any) => {
    setSelectedAddress(address)
  }


  return (
    <UserLayout>
      <CheckoutContainer>
        {/* <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" /> */}
        <Box sx={{ width: { xs: "100%", lg: "50%" } }}>
          <Paper>
            <OrderSummaryContainer>
              <Typography variant="h6" fontWeight="bold">YOUR ORDER</Typography>
              {loading ? (
                <Typography mt={2}>Loading...</Typography>
              ) : (
                <ProductListContainer>
                  {checkoutItems.items?.map((product: any, index: number) => <SelectedProductsList key={product.id} product={product} index={index} />)}
                </ProductListContainer>
              )}
              <Divider />
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
                Address Details
              </Typography>
              <Grid container spacing={2}>
                {Array.isArray(addresses) && addresses.length > 0 && addresses.map((address, index) => {
                  return <Grid size={{ xs: 12, sm: 6 }} key={index} >
                    <StyledCard sx={{ border: selectedAddress?._id === address._id ? "1px solid gray" : "" }} onClick={() => handleSelectAddress(address)}>
                      <CardContent >
                        <Typography variant="subtitle1" fontWeight="bold">{address.fullName}</Typography>
                        <Box sx={{ display: "flex" }}>
                          <Typography className="product-color-size">{address.street},{" "}</Typography>
                          <Typography className="product-color-size">{address.city},{" "}</Typography>
                          <Typography className="product-color-size">({address.zipCode}),{" "}</Typography>
                          <Typography className="product-color-size">{address.country}</Typography>
                        </Box>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                })}

              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomButton
                  label="Add Address"
                  fullWidth={true}
                  onClick={handleAddAddressModal}
                />
              </Grid>
              <Divider />
              <Grid container justifyContent="space-between" mt={2}>
                <Typography fontWeight="bold">Subtotal</Typography>
                <Typography>${checkoutItems.subTotal}.00</Typography>
              </Grid>
              <Grid container justifyContent="space-between" mt={1}>
                <Typography fontWeight="bold">Total Discount</Typography>
                <Typography>${checkoutItems.discountTotal}.00</Typography>
              </Grid>
              <Grid container justifyContent="space-between" mt={1}>
                <Typography fontWeight="bold">Shipping</Typography>
                <Typography color="gray">Calculated at next step</Typography>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Grid container justifyContent="space-between">
                <Typography fontWeight="bold">Total</Typography>
                <Typography fontWeight="bold">${checkoutItems.grandTotal}.00</Typography>
              </Grid>
            </OrderSummaryContainer>
          </Paper>
          <CustomButton
            type={"button"}
            label={"Proceed to Payment"}
            fullWidth={true}
            onClick={handleProceedToPayment}
          />
        </Box>
        <AddAddressModal
          open={openAddAddressModal}
          handleClose={() => setOpenAddAddressModal(false)}
          handleSave={handleAddAddress}
        />

      </CheckoutContainer>
    </UserLayout>
  );
};

export default Checkout;

const CheckoutContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  overflowY: "auto",
  maxHeight: "800px",
  "&::-webkit-scrollbar": { display: "none" },
  scrollbarWidth: "none",
  "-ms-overflow-style": "none",
});

const StyledProductCard = styled(Box)({
  padding: "16px",
  borderBottom: "1px solid #e0e0e0",
  background: "#f9f9f9",
  borderRadius: "8px",
  display: "flex",
  alignItems: "flex-start",
  margin: "10px 0",
  "& .product-image": { width: "100%", maxHeight: "100px", borderRadius: "8px" },
  "& .product-details": { flexGrow: 1, paddingLeft: "16px" },
  "& .product-title": { fontWeight: "bold" },
  "& .product-color-size": { color: "gray" },
  "& .product-quantity": { color: "gray", fontWeight: "bold" },
  "& .product-right": { textAlign: "right" },
  "& .product-price": { fontWeight: "bold" },
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
  "&::-webkit-scrollbar": { display: "none" },
  scrollbarWidth: "none",
  "-ms-overflow-style": "none",
});
const StyledCard = styled(Card)({
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  padding: "10px",
});
const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
});

function setRazorLoaded(arg0: boolean): any {
  throw new Error("Function not implemented.");
}
