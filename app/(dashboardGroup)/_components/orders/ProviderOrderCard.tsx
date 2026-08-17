"use client";

import Image from "next/image";
import { useTransition, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { ProviderOrderCardProps } from "@/lib/types";
import { updateOrderStatus } from "../../_actions/providerGearActions";





const statusVariant = {
    PLACED: "bg-yellow-100 text-yellow-800 border-yellow-300",
    CONFIRMED: "bg-blue-100 text-blue-800 border-blue-300",
    PAID: "bg-purple-100 text-purple-800 border-purple-300",
    PICKED_UP: "bg-green-100 text-green-800 border-green-300",
    RETURNED: "bg-gray-100 text-gray-800 border-gray-300",
    CANCELLED: "bg-red-100 text-red-800 border-red-300",
} as const;

export function ProviderOrderCard({
    order,
}: ProviderOrderCardProps) {
    const [pending, startTransition] = useTransition();
    const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

    const handleStatusUpdate = (status: string) => {
        setUpdatingStatus(status);

        startTransition(async () => {
            const result = await updateOrderStatus(
                order.id,
                status
            );

            setUpdatingStatus(null);

            if (result.success) {
                toast.success(
                    result.message || "Rental status updated successfully."
                );
            } else {
                toast.error(
                    result.message || "Failed to update rental status."
                );
            }
        });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <CardTitle className="text-lg">
                            {order.gearItem.name}
                        </CardTitle>

                        <p className="text-sm text-muted-foreground">
                            {order.gearItem.brand}
                        </p>
                    </div>

                    <Badge
                        variant="outline"
                        className={statusVariant[order.status]}
                    >
                        {order.status.replace("_", " ")}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-5">
                {/* Gear */}
                <div className="flex gap-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border bg-muted">
                        {order.gearItem.image ? (
                            <Image
                                src={order.gearItem.image}
                                alt={order.gearItem.name}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                                No image
                            </div>
                        )}
                    </div>

                    <div className="space-y-1 text-sm">
                        <p>
                            <span className="font-medium">
                                Quantity:
                            </span>{" "}
                            {order.quantity}
                        </p>

                        <p>
                            <span className="font-medium">
                                Daily price:
                            </span>{" "}
                            ${order.gearItem.dailyRentalPrice}
                        </p>

                        <p>
                            <span className="font-medium">
                                Total:
                            </span>{" "}
                            ${order.totalAmount}
                        </p>
                    </div>
                </div>

                <Separator />

                {/* Customer */}
                <div>
                    <h3 className="font-semibold">
                        Customer
                    </h3>

                    <div className="mt-2 text-sm text-muted-foreground">
                        <p>{order.customer.name}</p>
                        <p>{order.customer.email}</p>
                    </div>
                </div>

                {/* Rental dates */}
                <div>
                    <h3 className="font-semibold">
                        Rental Period
                    </h3>

                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground">
                                Start Date
                            </p>
                            <p className="font-medium">
                                {new Date(
                                    order.startDate
                                ).toLocaleDateString()}
                            </p>
                        </div>

                        <div>
                            <p className="text-muted-foreground">
                                End Date
                            </p>
                            <p className="font-medium">
                                {new Date(
                                    order.endDate
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Payment */}
                {order.payment && (
                    <>
                        <Separator />

                        <div>
                            <h3 className="font-semibold">
                                Payment
                            </h3>

                            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                                <p>
                                    Status:{" "}
                                    <span className="font-medium text-foreground">
                                        {order.payment.status}
                                    </span>
                                </p>

                                <p>
                                    Provider:{" "}
                                    <span className="font-medium text-foreground">
                                        {order.payment.provider}
                                    </span>
                                </p>

                                {order.payment.paidAt && (
                                    <p>
                                        Paid at:{" "}
                                        {new Date(
                                            order.payment.paidAt
                                        ).toLocaleString()}
                                    </p>
                                )}
                            </div>
                        </div>
                    </>
                )}

                <Separator />

                {/* Actions */}
                <div className="flex justify-end gap-2">
                    {order.status === "PLACED" && (
                        <>
                            <Button
                                disabled={pending}
                                onClick={() =>
                                    handleStatusUpdate("CANCELLED")
                                }
                            >
                                {updatingStatus === "CANCELLED"
                                    ? "Cancelling..."
                                    : "Cancel Rental"}
                            </Button>

                            <Button
                                disabled={pending}
                                onClick={() =>
                                    handleStatusUpdate("CONFIRMED")
                                }
                            >
                                {updatingStatus === "CONFIRMED"
                                    ? "Confirming..."
                                    : "Confirm Rental"}
                            </Button>
                        </>
                    )}

                    {order.status === "CONFIRMED" && (
                        <p className="text-sm text-muted-foreground">
                            Waiting for customer payment.
                        </p>
                    )}

                    {order.status === "PAID" && (
                        <Button
                            disabled={pending}
                            onClick={() =>
                                handleStatusUpdate(
                                    "PICKED_UP"
                                )
                            }
                        >
                            {pending
                                ? "Updating..."
                                : "Mark as Picked Up"}
                        </Button>
                    )}

                    {order.status === "PICKED_UP" && (
                        <Button
                            disabled={pending}
                            onClick={() =>
                                handleStatusUpdate(
                                    "RETURNED"
                                )
                            }
                        >
                            {pending
                                ? "Updating..."
                                : "Mark as Returned"}
                        </Button>
                    )}

                    {order.status === "RETURNED" && (
                        <p className="text-sm text-muted-foreground">
                            This rental has been returned.
                        </p>
                    )}

                    {order.status === "CANCELLED" && (
                        <p className="text-sm text-destructive">
                            This rental was cancelled.
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}