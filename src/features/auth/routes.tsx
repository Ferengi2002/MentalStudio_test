import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import * as React from "react";

export default function ProtectedRoute() {
    const { token } = useAuth();
    if (!token) return <Navigate to="/login" replace />;
    return <Outlet />;
}
