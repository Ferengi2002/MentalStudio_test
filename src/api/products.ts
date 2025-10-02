import axios from 'axios'
import type { ProductsResponse } from '../types/products'
import { getToken } from '@context/AuthContext'

const BASE = 'https://dummyjson.com'

export async function fetchProducts(page: number, limit: number): Promise<ProductsResponse> {
    const token = getToken()
    const skip = (page - 1) * limit
    const { data } = await axios.get<ProductsResponse>(`${BASE}/products`, {
        params: { limit, skip },
        headers: {
            Authorization: `Bearer ${token ?? ''}`,
            'Content-Type': 'application/json',
        },
    })
    return data
}
