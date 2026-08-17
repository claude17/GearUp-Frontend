"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerRental } from "@/lib/types";
import { PayNowButton } from "./PayNowButton";
import { ReviewDialog } from "../review/ReviewDialog";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateOrderStatus } from "../../_actions/providerGearActions";
import { Button } from "@/components/ui/button";



type RentalCardProps = {
    rental: CustomerRental;
};

export function RentalCard({ rental }: RentalCardProps) {

    const [reviewSubmitted, setReviewSubmitted] = useState(
        !!rental.review
    );

    const [pending, startTransition] = useTransition();

    const startDate = new Date(rental.startDate).toLocaleDateString();
    const endDate = new Date(rental.endDate).toLocaleDateString();

    const handleCancel = () => {
        startTransition(async () => {
            const result = await updateOrderStatus(
                rental.id,
                "CANCELLED"
            );

            if (result.success) {
                toast.success("Rental cancelled successfully.");
            } else {
                toast.error(
                    result.message || "Failed to cancel rental."
                );
            }
        });
    };

    return (
        <Card className="overflow-hidden">
            {rental.gearItem.image && (
                <div className="relative h-52 w-full">
                    <Image
                        src={rental.gearItem.image}
                        alt={rental.gearItem.name}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                </div>
            )}

            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <CardTitle>{rental.gearItem.name}</CardTitle>

                        <p className="text-sm text-muted-foreground">
                            {rental.gearItem.brand}
                        </p>
                    </div>

                    <RentalStatusBadge status={rental.status} />
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-muted-foreground">
                            Start Date
                        </p>

                        <p className="font-medium">
                            {startDate}
                        </p>
                    </div>

                    <div>
                        <p className="text-muted-foreground">
                            End Date
                        </p>

                        <p className="font-medium">
                            {endDate}
                        </p>
                    </div>

                    <div>
                        <p className="text-muted-foreground">
                            Quantity
                        </p>

                        <p className="font-medium">
                            {rental.quantity}
                        </p>
                    </div>

                    <div>
                        <p className="text-muted-foreground">
                            Total
                        </p>

                        <p className="font-semibold">
                            ${rental.totalAmount.toFixed(2)}
                        </p>
                    </div>
                </div>

                {rental.status === "PLACED" && (
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-sm text-muted-foreground">
                            Waiting for the provider to confirm your rental.
                        </p>

                        <Button
                            variant="destructive"
                            size="sm"
                            disabled={pending}
                            onClick={handleCancel}
                            className="cursor-pointer"
                        >
                            {pending ? "Cancelling..." : "Cancel Rental"}
                        </Button>
                    </div>
                )}

                {rental.status === "CONFIRMED" && (
                    <PayNowButton
                        rentalOrderId={rental.id}
                    />
                )}

                {rental.status === "PAID" && (
                    <p className="text-sm font-medium text-green-600">
                        Payment completed. Waiting for pickup.
                    </p>
                )}

                {rental.status === "RETURNED" && !reviewSubmitted && (
                    <ReviewDialog
                        rentalId={rental.id}
                        gearName={rental.gearItem.name}
                        onReviewSubmitted={() => setReviewSubmitted(true)}
                    />
                )}

                {rental.status === "RETURNED" && reviewSubmitted && (
                    <p className="text-sm text-muted-foreground">
                        You already reviewed this gear.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}

function RentalStatusBadge({
    status,
}: {
    status: CustomerRental["status"];
}) {
    const labels: Record<CustomerRental["status"], string> = {
        PLACED: "Placed",
        CONFIRMED: "Confirmed",
        PAID: "Paid",
        PICKED_UP: "Picked Up",
        RETURNED: "Returned",
        CANCELLED: "Cancelled",
    };

    return (
        <Badge
    className={
        status === "PLACED"
            ? "bg-yellow-100 text-yellow-800 border-yellow-300"
            : status === "CONFIRMED"
            ? "bg-blue-100 text-blue-800 border-blue-300"
            : status === "PAID"
            ? "bg-purple-100 text-purple-800 border-purple-300"
            : status === "PICKED_UP"
            ? "bg-green-100 text-green-800 border-green-300"
            : status === "RETURNED"
            ? "bg-gray-100 text-gray-800 border-gray-300"
            : "bg-red-100 text-red-800 border-red-300"
            }
        >
            {labels[status]}
        </Badge>
    );
}