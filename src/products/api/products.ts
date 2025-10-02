import { api } from "@lib/http";

export async function fetchProducts(params?: { limit?: number; skip?: number }) {
    const resp = await api.get("/products", { params });
    return resp.data;
}
