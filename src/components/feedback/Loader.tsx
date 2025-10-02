import React from "react";

export default function Loader({ text = "Cargando..." }: { text?: string }) {
    return (
        <div className="flex items-center justify-center gap-3 py-6">
            <span className="animate-spin inline-block h-5 w-5 rounded-full border-2 border-indigo-600 border-t-transparent" />
            <span className="text-sm text-gray-600 dark:text-neutral-300">{text}</span>
        </div>
    );
}
