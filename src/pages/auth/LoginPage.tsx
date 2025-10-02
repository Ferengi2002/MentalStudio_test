import LoginForm from "../../components/forms/LoginForm";

export default function LoginPage() {
    return (
        <div className="relative min-h-screen bg-mesh overflow-hidden">

            <div className="min-h-screen w-full flex items-center justify-center p-6">
                <div className="glass-hero rounded-2xl w-full max-w-md p-8 fade-up">

                    <div className="brand-hero">
                        <h1 className="text-2xl font-extrabold leading-none">MentalStudio</h1>
                        <p className="brand-sub">Por: Juan Rengifo</p>
                    </div>

                    <p className="text-sm text-gray-400 mb-6 text-center">
                        Ingresa con tus credenciales de <span className="font-medium text-gray-300">DummyJSON</span>.
                    </p>

                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
