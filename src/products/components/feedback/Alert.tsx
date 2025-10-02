import * as React from "react";

type Variant = "error" | "success" | "info" | "warning";

const styles: Record<Variant, string> = {
    error: "border-red-500/30 bg-red-500/10 text-red-200",
    success: "border-green-500/30 bg-green-500/10 text-green-200",
    info: "border-indigo-500/30 bg-indigo-500/10 text-indigo-200",
    warning: "border-yellow-500/30 bg-yellow-500/10 text-yellow-200",
};

const Icon: React.FC<{ variant: Variant }> = ({ variant }) => {
    const stroke = "currentColor";
    switch (variant) {
        case "error":
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} className="mt-px">
                    <circle cx="12" cy="12" r="10" strokeWidth="1.7" />
                    <path d="M12 7v6m0 4h.01" strokeWidth="1.7" />
                </svg>
            );
        case "success":
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke}>
                    <path d="M20 6L9 17l-5-5" strokeWidth="1.7" />
                </svg>
            );
        case "warning":
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke}>
                    <path d="M12 9v4m0 4h.01" strokeWidth="1.7" />
                    <path d="M10.3 3.8 1.8 18a2 2 0 0 0 1.7 3h16.9a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z" strokeWidth="1.7" />
                </svg>
            );
        default:
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke}>
                    <circle cx="12" cy="12" r="10" strokeWidth="1.7" />
                    <path d="M12 8v4" strokeWidth="1.7" />
                    <circle cx="12" cy="16" r="1" />
                </svg>
            );
    }
};

export default function Alert({
    variant = "info",
    children,
}: {
    variant?: Variant;
    children: React.ReactNode;
}) {
    return (
        <div
            role="alert"
            className={`flex items-start gap-2 rounded-xl border px-3 py-2 text-sm ${styles[variant]}`}
        >
            <span className="shrink-0 mt-0.5"><Icon variant={variant} /></span>
            <div className="leading-snug">{children}</div>
        </div>
    );
}
