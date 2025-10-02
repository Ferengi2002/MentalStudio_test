import * as React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AppShell() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-mesh">
            <header className="sticky top-0 z-10 backdrop-blur bg-black/20 border-b border-white/10">
                <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
                    <Link to="/app" className="font-semibold">MentalStudio</Link>
                    <div className="flex items-center gap-3 text-sm">
                        {user && (
                            <>
                                <img src={user.image} alt="" className="w-7 h-7 rounded-full border border-white/15" />
                                <span className="hidden sm:block">{user.firstName} {user.lastName}</span>
                            </>
                        )}
                        <button className="btn-primary px-3 py-2" onClick={onLogout}>Salir</button>
                    </div>
                </div>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
