import * as React from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductsTable from "../../components/tables/ProductTable";
import Pagination from "../../components/navigation/Pagination";
import Loader from "@components/feedback/Loader";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const PER_PAGE = 12;

export default function ProductsPage() {
    const { token, user } = useAuth();
    if (!token || token === "undefined") return <Navigate to="/login" replace />;

    const [page, setPage] = React.useState(1);
    const { items, total, loading, error } = useProducts(page, PER_PAGE);

    return (
        <div className="min-h-screen bg-mesh p-6">
            <div className="max-w-6xl mx-auto glass-hero rounded-2xl p-6 fade-up">
                <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                    <div>
                        <h1 className="text-xl font-bold">Productos</h1>
                        <p className="text-xs text-gray-400">
                            Bienvenido, {user?.firstName} {user?.lastName}.
                        </p>
                    </div>
                </div>

                {loading && <Loader text="Cargando productos..." />}
                {error && (
                    <div
                        role="alert"
                        className="mt-2 mb-4 flex items-start gap-2 rounded-xl border px-3 py-2 text-sm border-red-500/30 bg-red-500/10 text-red-200"
                    >
                        <span className="shrink-0 mt-0.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="10" strokeWidth="1.7" />
                                <path d="M12 7v6m0 4h.01" strokeWidth="1.7" />
                            </svg>
                        </span>
                        <div className="leading-snug">{error}</div>
                    </div>
                )}
                {!loading && !error && <ProductsTable items={items} />}

                <div className="mt-5">
                    <Pagination page={page} perPage={PER_PAGE} total={total} onChange={setPage} />
                </div>
            </div>
        </div>
    );
}
