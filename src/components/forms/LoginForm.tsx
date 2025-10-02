import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import PasswordInput from "@components/ui/PasswordInput";
import Loader from "@components/feedback/Loader";
import { useAuth } from "../../context/AuthContext";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const schema = z.object({
    username: z.string().min(1, "Usuario requerido"),
    password: z.string().min(1, "Contraseña requerida"),
    remember: z.boolean().optional(),
});
type FormData = z.infer<typeof schema>;

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { remember: true } });

    const { loginWithCredentials, error } = useAuth();
    const navigate = useNavigate();

    const [submitting, setSubmitting] = React.useState(false);
    const [shake, setShake] = React.useState(false);

    const onSubmit = async (data: FormData) => {
        setSubmitting(true);
        const ok = await loginWithCredentials(data.username, data.password);
        if (ok) {
            if (!data.remember) {
                window.addEventListener(
                    "beforeunload",
                    () => {
                        localStorage.removeItem("ms_token");
                        localStorage.removeItem("ms_user");
                    },
                    { once: true }
                );
            }
            navigate("/app", { replace: true });
        } else {
            setShake(true);
            setTimeout(() => setShake(false), 400);
        }
        setSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${shake ? "shake" : ""}`}>
            <div>
                <label className="block text-sm mb-1">Usuario</label>
                <div className="input-icon">
                    <span className="ix">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm7 9a7 7 0 0 0-14 0" strokeWidth="1.7" />
                        </svg>
                    </span>
                    <Input placeholder="emilys" {...register("username")} />
                </div>
                {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>}
            </div>

            <div>
                <div className="form-aux mb-1">
                    <label className="block">Contraseña</label>
                    <a className="hover:underline cursor-pointer">¿Olvidaste tu contraseña?</a>
                </div>
                <PasswordInput placeholder="emilyspass" {...register("password")} />
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <div className="form-aux">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="switch" {...register("remember")} />
                    <span>Recordarme</span>
                </label>
            </div>

            {error && (
                <div
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border px-3 py-2 text-sm border-red-500/30 bg-red-500/10 text-red-200"
                >
                    <span className="shrink-0 mt-0.5">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" strokeWidth="1.7" />
                            <path d="M12 7v6m0 4h.01" strokeWidth="1.7" />
                        </svg>
                    </span>
                    <div className="leading-snug">{error}</div>
                </div>
            )}

            <Button className="w-full btn-shine" type="submit" disabled={submitting}>
                {submitting ? "Ingresando..." : "Ingresar"}
            </Button>
            {submitting && <Loader text="Validando credenciales..." />}

            <div className="divider my-4">
                <span>o continúa con</span>
            </div>

            <div className="social-row">
                <button type="button" className="social-btn google" aria-label="Continuar con Google" title="Google">
                    <span className="sr-only">Google</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M12 11v2h5.7c-.2 1.4-1.7 4-5.7 4a6 6 0 1 1 0-12 5.7 5.7 0 0 1 4 1.6l1.4-1.4A7.9 7.9 0 1 0 12 20c4.5 0 7.5-3.1 7.5-7.5 0-.5-.1-1-.2-1.5H12z" />
                    </svg>
                </button>

                <button type="button" className="social-btn github" aria-label="Continuar con GitHub" title="GitHub">
                    <span className="sr-only">GitHub</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M12 .7A11.3 11.3 0 0 0 8.4 22c.6.1.8-.3.8-.7v-2.4c-3.4.7-4.1-1.5-4.1-1.5-.6-1.4-1.3-1.9-1.3-1.9-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .1.8-.7 1.7-1 .1-.7.4-1 .8-1.3-2.7-.3-5.6-1.3-5.6-6A4.6 4.6 0 0 1 5 6.4c-.2-.6-.8-2 .1-3.9 0 0 1.3-.4 4.1 1.6 1.2-.3 2.4-.5 3.6-.5s2.4.2 3.6.5C19.2 2.5 20.5 2.9 20.5 2.9c.9 1.9.3 3.3.1 3.9a4.6 4.6 0 0 1 1.2 3.2c0 4.7-2.9 5.7-5.6 6 .4.3.8 1 .8 2.1v3.1c0 .4.2.8.8.7A11.3 11.3 0 0 0 12 .7z" />
                    </svg>
                </button>

                <button type="button" className="social-btn facebook" aria-label="Continuar con Facebook" title="Facebook">
                    <span className="sr-only">Facebook</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M14 9h3V5h-3c-2 0-4 2-4 4v3H7v4h3v7h4v-7h3l1-4h-4v-3c0-.6.4-1 1-1z" />
                    </svg>
                </button>
            </div>

        </form>
    );
}
