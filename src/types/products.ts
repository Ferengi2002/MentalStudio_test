export type Product = {
    id: number;
    title: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
};

export type ProductsResponse = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};
