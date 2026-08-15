"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

import { createCheckoutSession } from "../../_actions/rentalActions";

type PayNowButtonProps = {
    rentalOrderId: string;
};

export function PayNowButton({
    rentalOrderId,
}: PayNowButtonProps) {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        await createCheckoutSession(rentalOrderId);
    };

    return (
        <Button
            type="button"
            className="w-full"
            disabled={loading}
            onClick={handlePayment}
        >
            <CreditCard className="mr-2 size-4" />

            {loading
                ? "Redirecting to payment..."
                : "Pay Now"}
        </Button>
    );
}