"use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axiosInstance";

export interface UserProfileData {
    _id: string;
    name: string;
    email?: string;
    phone: string;
    isVerified: boolean;
    role: string;
    createdAt?: string;
    updatedAt?: string;
}

interface UserState {
    user: UserProfileData | null;
    loading: boolean;
    error: string | null;
    verifyMessage: string;
    verifyError: string;
    otpVerified: boolean;
    otpResent: boolean;
}

interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
    verifyMessage: "",
    verifyError: "",
    otpVerified: false,
    otpResent: false
};

// Thunks
export const loginUser = createAsyncThunk<{ user: UserProfileData }, { email: string; password: string }>("auth/login", async (payload, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post("/api/auth/login", payload);
        // { success, message, user }
        return { user: res.data.user as UserProfileData };
    } catch (err: any) {
        return rejectWithValue(err?.response?.data?.message ?? "Login failed");
    }
});

export const registerUser = createAsyncThunk<
    { message: string },
    FormData | Record<string, any>
>("auth/register", async (payload, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post("/api/auth/register", payload);
        return { success: res.data.success, user: res.data.user, redirectUrl: res.data.redirectUrl, message: res.data.message ?? "Registered" };
    } catch (err: any) {
        return rejectWithValue(err?.response?.data?.message ?? "Registration failed");
    }
});

export const getUserProfile = createAsyncThunk<UserProfileData>(
    "auth/profile",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("/api/auth/profile");
            // returns full user document without password
            return res.data as UserProfileData;
        } catch (err: any) {
            return rejectWithValue(err?.response?.data?.message ?? "Failed to fetch profile");
        }
    }
);

export const logoutSlice = createAsyncThunk<ApiResponse<null>, void, { rejectValue: string }>("auth/logout", async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post("/api/auth/logout");
        return (
            res.data || {
                success: true,
                message: "Logged out successfully",
                data: null,
            }
        );
    } catch (err: any) {
        return rejectWithValue(
            err?.response?.data?.message ?? "Logout failed"
        );
    }
}
);

export const verifyEmail = createAsyncThunk(
    "auth/verifyEmail",
    async (token: string, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("/api/auth/verify-email", { token });
            return res.data.message;
        } catch (err: any) {
            return rejectWithValue(
                err?.response?.data?.message || "Verification failed"
            );
        }
    }
);

export const verifyOtp = createAsyncThunk(
    "auth/verifyOtp",
    async ({ phone, otp, email, role, name }: { phone: string; otp: string; email?: string; role?: string; name?: string }, thunkAPI) => {
        try {
            const res = await axiosInstance.post("/api/auth/verify-otp", { phone, otp, email, role, name });
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err?.response?.data?.message ?? err.message);
        }
    }
);

export const resendOtp = createAsyncThunk(
    "auth/resendOtp",
    async (
        { phone, email, name }: { phone?: string; email: string; name?: string },
        thunkAPI
    ) => {
        try {
            const res = await axiosInstance.post("/api/auth/resend-otp", { phone, email, name });
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err?.response?.data?.message ?? err.message);
        }
    }
);

// Slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUser(state) {
            state.user = initialState.user;
            state.error = null;
        },
    },
    extraReducers: (b) => {
        b.addCase(loginUser.pending, (s) => {
            s.loading = true;
            s.error = null;
        });
        b.addCase(loginUser.fulfilled, (s, a: PayloadAction<{ user: UserProfileData }>) => {
            s.loading = false;
            s.user = a.payload.user;
        });
        b.addCase(loginUser.rejected, (s, a) => {
            s.loading = false;
            s.error = (a.payload as string) ?? a.error.message ?? null;
        });

        b.addCase(registerUser.pending, (s) => {
            s.loading = true;
            s.error = null;
        });
        b.addCase(registerUser.fulfilled, (s) => {
            s.loading = false;
        });
        b.addCase(registerUser.rejected, (s, a) => {
            s.loading = false;
            s.error = (a.payload as string) ?? a.error.message ?? null;
        });

        b.addCase(getUserProfile.pending, (s) => {
            s.loading = true;
            s.error = null;
        });
        b.addCase(getUserProfile.fulfilled, (s, a: PayloadAction<UserProfileData>) => {
            s.loading = false;
            s.user = a.payload;
        });
        b.addCase(getUserProfile.rejected, (s, a) => {
            s.loading = false;
            s.error = (a.payload as string) ?? a.error.message ?? null;
        });

        b.addCase(logoutSlice.pending, (s) => {
            s.loading = true;
            s.error = null;
        });
        b.addCase(logoutSlice.fulfilled, (s) => {
            s.loading = false;
            s.user = initialState.user;
        });
        b.addCase(logoutSlice.rejected, (s, a) => {
            s.loading = false;
            s.error = (a.payload as string) ?? a.error.message ?? null;
        });
        b.addCase(verifyEmail.pending, (state) => {
            state.loading = true;
            state.verifyError = "";
        })
        b.addCase(verifyEmail.fulfilled, (state, action) => {
            state.loading = false;
            state.verifyMessage = action.payload;
        })
        b.addCase(verifyEmail.rejected, (state, action) => {
            state.loading = false;
            state.verifyError = action.payload as string;
        });
        b.addCase(verifyOtp.pending, (state) => {
            state.loading = true;
        })
        b.addCase(verifyOtp.fulfilled, (state, action) => {
            state.loading = false;
            state.otpVerified = true;
        })
        b.addCase(verifyOtp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        b.addCase(resendOtp.pending, (state) => {
            state.loading = true;
        })
        b.addCase(resendOtp.fulfilled, (state, action) => {
            state.loading = false;
            state.otpResent = true;
        })
        b.addCase(resendOtp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
