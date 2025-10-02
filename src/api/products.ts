import { api } from "./http";
import type { ProductsResponse } from "../types/products";

export async function fetchProducts(page: number, limit: number): Promise<ProductsResponse> {
    const skip = (page - 1) * limit;
    const { data } = await api.get<ProductsResponse>("/products", {
        params: { limit, skip },
    });
    return data;
}
