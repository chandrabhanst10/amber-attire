// slices/paymentSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axiosInstance";

interface ProductItem {
  _id: string;
  productName: string;
  price: number;
  discountPrice?: number;
  quantity: number;
}

interface CreateOrderPayload {
  products: ProductItem[];
  amount: number;
}

interface VerifyPaymentPayload {
  orderId: string;
  paymentId: string;
  signature: string;
  shippingAddress: any;
  email: string;
  phone: string
}


interface PaymentState {
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  loading: false,
  error: null,
};


export const createOrder = createAsyncThunk<any, CreateOrderPayload>("payments/createOrder", async (payload) => {
  const response = await axiosInstance.post(`/api/payments/create`, payload);
  return response.data;
}
);

export const verifyPayment = createAsyncThunk<any, VerifyPaymentPayload>("/payments/verifyPayment", async (payload) => {
  const response = await axiosInstance.post("/api/payments/verify", payload);
  return response.data;
}
);

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = ""
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = ""
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
  },
});

export default paymentSlice.reducer;
