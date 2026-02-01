"use client"
import { Box, Typography, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useMemo } from "react";
import CustomButton from "../../Components/CustomButton";
import { useDispatch } from "react-redux";
import { useGetCartQuery, useRemoveFromCartMutation, useUpdateCartItemMutation, useClearCartMutation } from "../../redux/apiSlice";
import { toast } from 'react-toastify';
import Loader from "../../Components/Loader";
import { AppDispatch } from "../../redux/store";
import useNavigate from "../../Utils/Navigation";
import { getCheckoutFromCart } from "../../redux/slices/checkout";
import { getAllAddresses } from "../../redux/slices/addressSlice";
import CartSkeleton from "../../Components/skeletons/CartSkeleton";
// Import shared types
import { CartItem } from "../../types/types";
import UserLayout from "../../layout";

const CartScreen = () => {
  const { data: cartData, isLoading } = useGetCartQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [clearCart] = useClearCartMutation();

  // Initialize with fallback consistent with API response structure
  const cartItemsData = cartData || { cart: [], subTotal: 0, grandTotal: 0 };

  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const deleteItem = useCallback(async (productId: string) => {
    try {
      await removeFromCart(productId).unwrap();
      toast.success("Item removed");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  }, [removeFromCart])

  const handleUpdateCartItem = useCallback(async (productId: string, change: number) => {
    // Find item in current data
    const item = cartItemsData.cart?.find((i: CartItem) => i.productId._id === productId);
    if (!item) return;

    const newQuantity = item.quantity + change;
    if (newQuantity < 1) return;

    try {
      await updateCartItem({ productId, quantity: newQuantity }).unwrap();
    } catch (error) {
      console.error("Failed to update cart:", error);
      toast.error("Failed to update quantity");
    }
  }, [cartItemsData, updateCartItem])

  //clear cart
  const handleClearCart = useCallback(async () => {
    try {
      await clearCart().unwrap();
      toast.success("Cart cleared");
    } catch (err) {
      toast.error("Failed to clear cart");
    }
  }, [clearCart]);

  const totals = useMemo(() => {
    // If backend returns totals, use them. If not, calculate.
    // Based on the requirement "sync with useGetCartQuery", simpler is better.
    // Assuming backend returns these or we calculate from items.
    // If cartData doesn't have subTotal, we calculate it.
    let subTotal = (cartItemsData as any).subTotal || 0;

    if (subTotal === 0 && cartItemsData.cart?.length > 0) {
      subTotal = cartItemsData.cart.reduce((acc: number, item: CartItem) => acc + (item.productId.price * item.quantity), 0);
    }

    const grandTotal = (cartItemsData as any).grandTotal || subTotal;
    const discount = grandTotal && subTotal ? grandTotal - subTotal : 0;
    return { subTotal, grandTotal, discount };
  }, [cartItemsData]);

  const handleProceedToCheckout = async () => {
    try {
      await dispatch(getCheckoutFromCart()).unwrap();
      await dispatch(getAllAddresses());
      navigation("/user/checkout");
    } catch (error) {
      console.error("Error in checkout:", error);
    }
  };


  return (
    <UserLayout>
      <CartContainer>
        {isLoading ? <CartSkeleton /> : <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" fontWeight="bold" margin={"20px 0px"}>Cart</Typography>
            <CustomButton
              type={"button"}
              label={"Clear"}
              fullWidth={false}
              onClick={handleClearCart}
            />
          </Box>
          <CartList container rowSpacing={1} columnSpacing={1}>
            {Array.isArray(cartItemsData?.cart) && cartItemsData.cart.length > 0 ? cartItemsData.cart.map((item: CartItem) => {
              const imageUrl = item.productId.images?.[0] || item.productId.featureImage;

              return <Grid key={item.productId._id} size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
                <StyledProductCard container alignItems="center" columnSpacing={1}>
                  <Grid size={{ xs: 3, sm: 3, md: 3, lg: 3 }}>
                    <ProductImage src={imageUrl} alt={item.productId.productName} />
                  </Grid>
                  <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                    <Typography fontWeight="bold">{item.productId.productName}</Typography>
                    <Typography fontWeight="bold" >
                      <span className='productDiscountPrice'>${((item.productId.offerPrice || item.productId.price) * item.quantity).toFixed(2)}{" - "}</span>
                      <span className='productPrice'>${(item.productId.price * item.quantity).toFixed(2)}</span>
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 3, sm: 3, md: 3, lg: 3 }} >
                    <Box sx={{ position: "absolute", top: 0, right: 0 }}>
                      <IconButton onClick={() => deleteItem(item.productId._id)} color="error"><DeleteIcon /></IconButton>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <IconButton onClick={() => handleUpdateCartItem(item.productId._id, -1)} size="small"><RemoveIcon /></IconButton>
                      <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                      <IconButton onClick={() => handleUpdateCartItem(item.productId._id, +1)} size="small"><AddIcon /></IconButton>
                    </Box>
                  </Grid>
                </StyledProductCard>
              </Grid>
            }) : <Typography>No Cart Item</Typography>}
          </CartList>
          <SummarySection>
            <Grid container spacing={1}>
              <Grid size={{ xs: 6 }}><Typography sx={{ fontWeight: "bold" }}>Subtotal</Typography></Grid>
              <Grid size={{ xs: 6 }} sx={{ textAlign: "right" }}><Typography sx={{ fontWeight: "bold" }}>${totals.subTotal.toFixed(2)}</Typography></Grid>
              <Grid size={{ xs: 6 }}><Typography sx={{ fontWeight: "bold" }}>Discount</Typography></Grid>
              <Grid size={{ xs: 6 }} sx={{ textAlign: "right" }}><Typography color="gray">{totals.discount.toFixed(2)}</Typography></Grid>
              <Grid size={{ xs: 6 }}><Typography variant="h6" sx={{ fontWeight: "bold" }}>Total</Typography></Grid>
              <Grid size={{ xs: 6 }} sx={{ textAlign: "right" }}><Typography variant="h6" sx={{ fontWeight: "bold" }}>${totals.grandTotal.toFixed(2)}</Typography></Grid>
            </Grid>
          </SummarySection>
          {cartItemsData?.cart?.length > 0 &&
            <CustomButton
              type={"button"}
              label={"Proceed to Checkout"}
              fullWidth={true}
              onClick={handleProceedToCheckout}
            />}
        </Box>}
      </CartContainer>
    </UserLayout>
  );
};

export default CartScreen;

// Styled Components
const CartContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  // margin: "auto",
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
  },
}));

const CartList = styled(Grid)({
  maxHeight: "400px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none", // hide scrollbar in Chrome, Safari
  },
  scrollbarWidth: "none",      // hide scrollbar in Firefox
  msOverflowStyle: "none",     // hide scrollbar in IE & Edge
});


const StyledProductCard = styled(Grid)(({ theme }) => ({
  padding: "16px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  position: "relative",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "row",
    padding: "8px",
  },
  "& .productPrice": {
    fontSize: "16px",
    fontWeight: 300,
    color: "gray",
    textDecoration: "line-through"
  },
  "& .productDiscountPrice": {
    fontSize: "16px",
    fontWeight: 300,
    color: "gray",

  },
}));

const ProductImage = styled("img")(({ theme }) => ({
  width: "100%",
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
