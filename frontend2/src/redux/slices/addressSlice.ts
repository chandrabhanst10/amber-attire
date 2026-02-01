import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axiosInstance";

// ✅ Address interface
export interface AddressData {
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  fullName: string;
  _id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number
}

export interface GetAddressesResponse {
  addresses: AddressData[];
}

// ✅ Slice state interface
interface AddressState {
  addresses: AddressData[];
  address: AddressData | null;
  loading: boolean;
  error: string;
}

const initialState: AddressState = {
  addresses: [],
  address: null,
  loading: false,
  error: "",
};

// ✅ Async thunks

// Add Address
export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/address/add-address", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get All Addresses
export const getAllAddresses = createAsyncThunk<GetAddressesResponse>(
  "address/getAllAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/address/get-all-addresses");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Address by ID
export const getAddressById = createAsyncThunk<AddressData, string>(
  "address/getAddressById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/address/get-address/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Address
export const updateAddress = createAsyncThunk<AddressData, { id: string; data: Partial<AddressData> }>(
  "address/updateAddress",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/address/update-address/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Address
export const deleteAddress = createAsyncThunk<string, string>(
  "address/deleteAddress",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/address/delete-address/${id}`);
      return id; // return deleted id
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Slice
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Address
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add address";
      })

      // Get All Addresses
      .addCase(getAllAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload?.addresses;
      })
      .addCase(getAllAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch addresses";
      })

      // Get Address by ID
      .addCase(getAddressById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAddressById.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
      })
      .addCase(getAddressById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch address";
      })

      // Update Address
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update address";
      })

      // Delete Address
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete address";
      });
  },
});

export default addressSlice.reducer;
