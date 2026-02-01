// slices/productSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axiosInstance";
import axios from "axios";

interface ProductState {
  products: any[];
  loading: boolean;
  error: string | null;
  paginationData: any;
  imageUploaded: boolean;
  currentProduct: any
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  paginationData: {},
  imageUploaded: false,
  currentProduct: {}
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (page: number = 1) => {
  const response = await axiosInstance.get(`/api/products?page=${page}`);
  return response.data;
});

export const uploadImages = createAsyncThunk("/product/uploadImages", async (payload: any) => {
  const { files, imageCode } = payload;
  try {
    const response = await axios.get(`https://rwdpyiyp6c.execute-api.ap-south-1.amazonaws.com/Dev/aangan?filename=${imageCode}`);
    const uploadResponses = await Promise.all(
      response.data.upload_files.map(
        async (url: { upload_url: string }, index: number) => {
          return axios.put(url.upload_url, files[index]);
        }
      )
    );
    return uploadResponses; // return to the slice
  } catch (err) {
    console.error(err);
    throw err; // make thunk reject properly
  }
}
);

export const addProduct = createAsyncThunk("/product/addProduct", async (payload: any) => {
  const response = await axiosInstance.post("/api/products", payload);
  return response.data
})

export const getProduct = createAsyncThunk("/product/get-product", async (payload: string) => {
  const response = await axiosInstance.get(`/api/products/${payload}`);
  return response.data
});

export const getProductByGender = createAsyncThunk("/product/getProductByGender", async () => {
  const response = await axiosInstance.get(`/api/products/gender`);
  return response.data;
});

export const getTaggedData = createAsyncThunk("/product/getTaggedData", async (payload: string) => {
  const response = await axiosInstance.get(`/api/products/tags`, { params: { tag: payload }, });
  return response.data
});


const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.paginationData = action.payload.pagination
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(uploadImages.pending, (state) => {
        state.loading = true;
        state.imageUploaded = false
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.loading = false;
        state.imageUploaded = true
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.currentProduct = action.payload.data;
        state.loading = false;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(getProductByGender.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductByGender.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getProductByGender.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(getTaggedData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTaggedData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getTaggedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
  },
});

export default productSlice.reducer;
