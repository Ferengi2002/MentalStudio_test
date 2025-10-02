import * as React from "react";
export default function StarRating({
    value,
    size = 18,
    showNumber = true,
}: { value: number; size?: number; showNumber?: boolean }) {
    const v = Math.max(0, Math.min(5, value));

    const fills = Array.from({ length: 5 }, (_, i) => {
        const rem = v - i;
        if (rem >= 1) return 1;
        if (rem <= 0) return 0;
        return rem;
    });

    return (
        <div className="flex items-center gap-2" aria-label={`Rating ${v.toFixed(1)} de 5`}>
            <div className="flex items-center gap-0.5">
                {fills.map((f, i) => (
                    <Star key={i} fillRatio={f} size={size} />
                ))}
            </div>
            {showNumber && <span className="text-gray-300 text-sm">{v.toFixed(1)}</span>}
        </div>
    );
}

function Star({ fillRatio, size }: { fillRatio: number; size: number }) {
    return (
        <span
            className="relative inline-block"
            style={{ width: size, height: size, lineHeight: 0 }}
            aria-hidden="true"
        >
            <svg
                viewBox="0 0 24 24"
                width={size}
                height={size}
                className="absolute inset-0 text-gray-500/40"
                fill="currentColor"
            >
                <path d="M12 3.6l2.5 5.1 5.6.8-4.1 4 1 5.6-5-2.6-5 2.6 1-5.6-4.1-4 5.6-.8L12 3.6z" />
            </svg>

            <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillRatio * 100}%` }}
            >
                <svg
                    viewBox="0 0 24 24"
                    width={size}
                    height={size}
                    className="text-indigo-500"
                    fill="currentColor"
                >
                    <path d="M12 3.6l2.5 5.1 5.6.8-4.1 4 1 5.6-5-2.6-5 2.6 1-5.6-4.1-4 5.6-.8L12 3.6z" />
                </svg>
            </span>
        </span>
    );
}
