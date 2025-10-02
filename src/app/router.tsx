import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "@features/auth/pages/LoginPage";
import ProtectedRoute from "../features/auth/routes"; // lo creamos abajo
import AppHome from "./shells/AppHome";
import * as React from "react";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/app" element={<AppHome />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}
