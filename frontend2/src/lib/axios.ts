import axios from "axios";
// We will inject the store to avoid circular dependency
let store: any;

export const injectStore = (_store: any) => {
    store = _store;
};

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_DEV_BACKEND_URL || "http://localhost:5500/api/v1",
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        // Attempt to get token from store
        const token = store?.getState()?.auth?.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Call refresh endpoint
                // Note: HttpOnly cookie is sent automatically withCredentials: true
                const { data } = await axiosInstance.post("/auth/refresh-token");

                // Update store with new access token
                const newAccessToken = data.accessToken;
                if (store) {
                    store.dispatch({
                        type: 'auth/setCredentials',
                        payload: { accessToken: newAccessToken, user: data.user } // Assuming user might be updated too, or just token
                    });
                }

                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Logout if refresh fails
                if (store) {
                    store.dispatch({ type: 'auth/logOut' });
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
