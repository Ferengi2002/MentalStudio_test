import * as React from "react";
import type { Product } from "types/products";
import StarRating from "../ui/StarRating";

export default function ProductsTable({ items }: { items: Product[] }) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="min-w-full text-sm">
                <thead className="bg-white/5">
                    <tr className="[&>th]:px-4 [&>th]:py-3 text-left text-gray-300">
                        <th>Producto</th>
                        <th className="hidden sm:table-cell">Categoría</th>
                        <th>Precio</th>
                        <th className="hidden md:table-cell">Rating</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {items.map((p) => (
                        <tr key={p.id} className="hover:bg-white/5 transition">
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={p.thumbnail}
                                        alt={p.title}
                                        className="w-12 h-12 rounded-lg object-cover border border-white/10"
                                        loading="lazy"
                                    />
                                    <div className="font-medium">{p.title}</div>
                                </div>
                            </td>
                            <td className="px-4 py-3 hidden sm:table-cell text-gray-300">{p.category}</td>
                            <td className="px-4 py-3">
                                <span className="rounded-lg px-2 py-1 bg-white/5 border border-white/10">
                                    ${p.price.toFixed(2)}
                                </span>
                            </td>
                            <td className="px-4 py-3 hidden md:table-cell">
                                <StarRating value={p.rating} />
                            </td>

                            <td className="px-4 py-3">
                                <span className="text-gray-100">{p.stock}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
