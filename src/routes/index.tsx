import * as React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import ProductsPage from "../pages/products/ProductsPage";
import AppShell from "../app/AppShell"; // tu layout con <Outlet />

export const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/login" replace /> },
    { path: "/login", element: <LoginPage /> },
    {
        path: "/app",
        element: <AppShell />,
        children: [
            { index: true, element: <ProductsPage /> },
        ],
    },
    { path: "*", element: <Navigate to="/login" replace /> },
]);
