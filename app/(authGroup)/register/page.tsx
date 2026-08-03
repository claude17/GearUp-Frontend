import Link from "next/link";
import RegisterForm from "../_components/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-lg">

                {/* Header */}
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">
                        Create Account
                    </h1>

                    <p className="text-muted-foreground">
                        Create your <span className="font-semibold">GearUp</span> account to start renting gear.
                    </p>
                </div>

                <RegisterForm />

                {/* Footer */}
                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-primary hover:underline"
                    >
                        Login
                    </Link>
                </div>

            </div>
        </div>
    );
}