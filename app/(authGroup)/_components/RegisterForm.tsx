"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { registerAction } from "../_actions/authActions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const RegisterForm = () => {
    const [state, action, pending] = useActionState(
        registerAction,
        null
    );

    useEffect(() => {
        if (!state) return;

        if (!state.success) {
            toast.error(state.message || "Registration failed");
        }
    }, [state]);

    return (
        <form action={action} className="space-y-6">
            <Card className="space-y-5 p-6">

                {/* Name */}
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>

                    <Input
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                {/* Role */}
                <div className="space-y-2">
                    <Label>Register As</Label>

                    <Select name="role" required>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your role" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="CUSTOMER">
                                Customer
                            </SelectItem>

                            <SelectItem value="PROVIDER">
                                Provider
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={pending}
                >
                    {pending ? "Creating Account..." : "Create Account"}
                </Button>

            </Card>
        </form>
    );
};

export default RegisterForm;