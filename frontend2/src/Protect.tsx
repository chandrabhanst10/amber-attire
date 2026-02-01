import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "../src/redux/store"

export const UserProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, token } = useSelector((state: RootState) => state.auth);
    const location = useLocation();

    if (!token || !user) return <Navigate to="/sign-in" replace />;

    // Check for OTP verification
    if (!user.isVerified) {
        const phone = user.phone || user.phoneNumber || "";
        const email = user.email || "";
        const name = user.name || "";
        // Redirect to verify-otp with details and trigger flag
        return <Navigate
            to={`/verify-otp?phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`}
            state={{ from: location, triggerOtp: true }}
            replace
        />;
    }

    if (user.role !== "USER" && user.role !== "ADMIN") {
        if (user.role !== "USER") return <Navigate to="/sign-in" replace />;
    }
    return <>{children}</>;
};

export const AdminProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, token } = useSelector((state: RootState) => state.auth);
    if (!token || !user) return <Navigate to="/admin/login" replace />;
    if (user.role !== "ADMIN") {
        return <Navigate to="/unauthorized" replace />;
    }
    return <>{children}</>;
};

export const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
    const { user, token } = useSelector((state: RootState) => state.auth);
    if (token && user) {
        if (user.role === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};

