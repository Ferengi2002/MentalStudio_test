import * as React from "react";
import { fetchProducts } from "../api/products";
import type { Product } from "../features/products/types";

export function useProducts(page: number, limit: number) {
    const [items, setItems] = React.useState<Product[]>([]);
    const [total, setTotal] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        let alive = true;
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetchProducts(page, limit);
                if (!alive) return;
                setItems(res.products);
                setTotal(res.total);
            } catch (e: any) {
                if (!alive) return;
                const status = e?.response?.status;
                setError(
                    status === 401
                        ? "Sesión inválida. Vuelve a iniciar sesión."
                        : "No se pudieron cargar los productos."
                );
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [page, limit]);

    return { items, total, loading, error };
}
