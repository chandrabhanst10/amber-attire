import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../lib/axiosInstance';

interface CartState {
  cartItems: any,
  loading: boolean,
  error: string
};

interface UpdateCartItemPayload {
  productId: string;
  quantity: string | number;
};

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: ""
};

interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export const addToCart = createAsyncThunk("products/addToCart", async (payload: AddToCartPayload) => {
  const response = await axiosInstance.post(`/api/cart`, payload);
  return response.data;
});
export const getCartData = createAsyncThunk("products/getCartData", async () => {
  const response = await axiosInstance.get(`/api/cart`);
  return response.data;
});
export const removeCartItem = createAsyncThunk("products/removeCartItem", async (payload: string) => {
  const response = await axiosInstance.delete(`/api/cart/${payload}`);
  return response.data;
});
export const updateCartItem = createAsyncThunk("products/updateCartItem", async (payload: UpdateCartItemPayload) => {
  const response = await axiosInstance.put(`/api/cart/${payload.productId}`, payload);
  return response.data;
});
export const clearCartItems = createAsyncThunk("products/clearCartItems", async () => {
  const response = await axiosInstance.delete(`/api/cart`);
  return response.data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(getCartData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartData.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.cart
      })
      .addCase(getCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(clearCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCartItems.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(clearCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
  }
});

export default cartSlice.reducer;
