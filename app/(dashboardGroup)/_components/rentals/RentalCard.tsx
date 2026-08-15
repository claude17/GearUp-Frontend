import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerRental } from "@/lib/types";
import { PayNowButton } from "./PayNowButton";



type RentalCardProps = {
    rental: CustomerRental;
};

export function RentalCard({ rental }: RentalCardProps) {
    const startDate = new Date(rental.startDate).toLocaleDateString();
    const endDate = new Date(rental.endDate).toLocaleDateString();

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
                    <p className="text-sm text-muted-foreground">
                        Waiting for the provider to confirm your rental.
                    </p>
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
        <Badge variant="outline">
            {labels[status]}
        </Badge>
    );
}