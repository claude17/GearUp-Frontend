"use client";

import { CustomerRental } from "@/lib/types";
import { RentalCard } from "./rentals/RentalCard";




type CustomerRentalListProps = {
    rentals: CustomerRental[];
};

export function CustomerRentalList({
    rentals,
}: CustomerRentalListProps) {

    if (!rentals.length) {
        return (
            <div className="rounded-xl border border-dashed p-10 text-center">
                <p className="text-muted-foreground">
                    You don't have any rental orders yet.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rentals.map((rental) => (
                <RentalCard
                    key={rental.id}
                    rental={rental}
                />
            ))}
        </div>
    );
}