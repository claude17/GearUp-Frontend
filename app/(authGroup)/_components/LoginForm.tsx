"use client";

import { useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { loginAction } from "../_actions/authActions";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
    const searchParams = useSearchParams();

    const redirectTo = searchParams.get("redirectTo") ?? "";

    const [state, action, pending] = useActionState(
        loginAction.bind(null, redirectTo),
        null
    );

    useEffect(() => {
        if (!state) return;

        if (!state.success) {
            toast.error(state.message || "Login failed");
        }
    }, [state]);

    return (
        <form action={action}>
            <Card className="space-y-5 p-6">

                <div className="space-y-2">
                    <Label
                        htmlFor="email"
                        className="text-sm font-medium"
                    >
                        Email
                    </Label>

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="password"
                        className="text-sm font-medium"
                    >
                        Password
                    </Label>

                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={pending}
                >
                    {pending ? "Signing In..." : "Login"}
                </Button>

            </Card>
        </form>
    );
};

export default LoginForm;