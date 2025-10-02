import * as React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    showLockIcon?: boolean;
};

export default function PasswordInput({
    className = "",
    showLockIcon = true,
    ...rest
}: Props) {
    const [show, setShow] = React.useState(false);

    const paddingLeft = showLockIcon ? "2.25rem" : undefined;
    const paddingRight = "2.5rem";

    return (
        <div className="relative">
            {showLockIcon && (
                <span
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    aria-hidden="true"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M6 10V7a6 6 0 1 1 12 0v3" strokeWidth="1.7" />
                        <rect x="3" y="10" width="18" height="11" rx="2" strokeWidth="1.7" />
                    </svg>
                </span>
            )}

            <input
                {...rest}
                type={show ? "text" : "password"}
                autoComplete="current-password"
                className={`input ${className}`}
                style={{ paddingLeft, paddingRight }}
            />

            <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="absolute inset-y-0 right-0 px-3 grid place-items-center text-gray-400 hover:text-gray-200"
            >
                {show ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 3l18 18" strokeWidth="2" strokeLinecap="round" />
                        <path d="M10.58 10.58a3 3 0 004.24 4.24" strokeWidth="2" strokeLinecap="round" />
                        <path d="M2 12s3.5-7 10-7 10 7 10 7" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" strokeWidth="2" />
                        <circle cx="12" cy="12" r="3" strokeWidth="2" />
                    </svg>
                )}
            </button>
        </div>
    );
}
