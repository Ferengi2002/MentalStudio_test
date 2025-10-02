import * as React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AuthUser, LoginResponse } from "../types";
import { login as apiLogin } from "../api/login";

type AuthState = {
    user: AuthUser | null;
    token: string | null;
    loginWithCredentials: (u: string, p: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
    error: string | null;
};

const AuthCtx = createContext<AuthState | null>(null);

const LS_TOKEN_KEY = "ms_token";
const LS_USER_KEY = "ms_user";

let tokenCache: string | null = null;
export function getToken() {
    return tokenCache;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const t = localStorage.getItem(LS_TOKEN_KEY);
        const u = localStorage.getItem(LS_USER_KEY);

        if (t && t !== "undefined") {
            setToken(t);
            tokenCache = t;
        } else {
            localStorage.removeItem(LS_TOKEN_KEY);
        }

        if (u) {
            try {
                setUser(JSON.parse(u));
            } catch {
                localStorage.removeItem(LS_USER_KEY);
            }
        }
    }, []);

    const loginWithCredentials = async (username: string, password: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const res = (await apiLogin({
                username: username.trim(),
                password,
            })) as LoginResponse & { accessToken?: string };

            const tok = (res as any).token ?? (res as any).accessToken;
            if (!tok || typeof tok !== "string") {
                throw new Error("No token returned by API");
            }

            const { id, username: un, firstName, lastName, image } = res;
            const authUser: AuthUser = { id, username: un, firstName, lastName, image };

            localStorage.setItem(LS_TOKEN_KEY, tok);
            localStorage.setItem(LS_USER_KEY, JSON.stringify(authUser));

            setToken(tok);
            tokenCache = tok;
            setUser(authUser);
            return true;
        } catch (e: any) {
            const status = e?.response?.status;
            const apiMsg = e?.response?.data?.message || e?.message;

            let msg = "No se pudo iniciar sesión. Inténtalo de nuevo.";
            if (status === 400 || /invalid/i.test(apiMsg ?? "")) {
                msg = "Usuario o contraseña incorrectos.";
            } else if (status === 429) {
                msg = "Demasiados intentos. Espera unos segundos e inténtalo nuevamente.";
            } else if (status >= 500) {
                msg = "Servidor no disponible. Intenta más tarde.";
            }

            setError(msg);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem(LS_TOKEN_KEY);
        localStorage.removeItem(LS_USER_KEY);
        tokenCache = null;
        setToken(null);
        setUser(null);
    };

    const value = useMemo<AuthState>(
        () => ({ user, token, loginWithCredentials, logout, isLoading, error }),
        [user, token, isLoading, error]
    );

    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};

export function useAuth() {
    const ctx = useContext(AuthCtx);
    if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
    return ctx;
}
