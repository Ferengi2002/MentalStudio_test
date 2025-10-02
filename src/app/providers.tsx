import { AuthProvider } from "@features/auth/context/AuthContext";
import * as React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>;
}
