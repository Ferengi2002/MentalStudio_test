import Card from "@components/ui/Card";
import Button from "@components/ui/Button";
import { useAuth } from "@features/auth/context/AuthContext";
import * as React from "react";

export default function AppHome() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Hola, Bienvenido a la página. Realizada por Juan Rengifo</h1>
                    <Button onClick={logout}>Cerrar sesión</Button>
                </div>
                <Card>
                    <p className="text-lg">¡Hola, <span className="font-semibold">{user?.firstName} {user?.lastName}</span>!</p>
                    <p className="text-sm text-gray-500 mt-2">Luego aquí va la tabla de productos protegida.</p>
                </Card>
            </div>
        </div>
    );
}
