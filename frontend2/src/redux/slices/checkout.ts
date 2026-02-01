import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axiosInstance";

export interface CheckoutItemImage {
  images: string[];
}

export interface CheckoutItem {
  _id: string;
  price: number;
  discountPrice: number;
  stock: number;
  imageCode: string;
  quantity: string;
  images: string[];
}

export interface CheckoutItems {
  _id: string;
  userId: string;
  items: CheckoutItem[];
  subTotal: number;
  discountTotal: number;
  taxTotal: number;
  shippingCost: number;
  grandTotal: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


interface CheckoutState {
  checkoutItems: CheckoutItems;
  loading: boolean;
  error: string;
}

const initialState: CheckoutState = {
  checkoutItems: {
    _id: "",
    userId: "",
    items: [],
    subTotal: 0,
    discountTotal: 0,
    taxTotal: 0,
    shippingCost: 0,
    grandTotal: 0,
    status: "",
    createdAt: "",
    updatedAt: "",
    __v: 0
  },
  loading: false,
  error: "",
};

// ✅ 1️⃣  Get checkout items from user's cart
export const getCheckoutFromCart = createAsyncThunk(
  "checkout/getCheckoutFromCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/checkout/cart`);
      return response.data; // ✅ only return serializable data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch checkout data");
    }
  }
);

// ✅ 2️⃣  Get checkout for single product by ID
export const getCheckoutForSingleProduct = createAsyncThunk(
  "checkout/getCheckoutForSingleProduct",
  async (payload: { productId: string; quantity: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/checkout/product/${payload.productId}/${payload.quantity}`);
      return response.data; // ✅ return only serializable data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch product checkout");
    }
  }
);


const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🛒 Get Checkout From Cart
      .addCase(getCheckoutFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCheckoutFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutItems = {
          _id: "",
          userId: "",
          items: [],
          subTotal: 0,
          discountTotal: 0,
          taxTotal: 0,
          shippingCost: 0,
          grandTotal: 0,
          status: "",
          createdAt: "",
          updatedAt: "",
          __v: 0
        }
        state.checkoutItems = action.payload.checkoutItems
      })
      .addCase(getCheckoutFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🛍️ Get Checkout For Single Product
      .addCase(getCheckoutForSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCheckoutForSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutItems = {
          _id: "",
          userId: "",
          items: [],
          subTotal: 0,
          discountTotal: 0,
          taxTotal: 0,
          shippingCost: 0,
          grandTotal: 0,
          status: "",
          createdAt: "",
          updatedAt: "",
          __v: 0
        }
        state.checkoutItems = action.payload.checkoutItems; // single product checkout
      })
      .addCase(getCheckoutForSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default checkoutSlice.reducer;
