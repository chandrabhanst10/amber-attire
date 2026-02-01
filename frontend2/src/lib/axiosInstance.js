// lib/axiosInstance.js
import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.REACT_APP_DEV_BACKEND_URL

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  withCredentials: true, // ✅ send cookies
  headers: {
    "Content-Type": "application/json", // ✅ default for all requests
  },
});

// ✅ Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting...");
      Cookies.remove("token");
      if (typeof window !== "undefined") {
        window.location.href = "/sign-in";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
