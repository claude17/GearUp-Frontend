import { CustomerRental } from "@/lib/types";
import { getMyRentals } from "../../_actions/rentalActions";
import { RentalCard } from "./RentalCard";
// import { RentalOrderCard } from "./RentalOrderCard";


export async function RentalList() {
    const result = await getMyRentals();

    if (!result.success) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                {result.message || "Failed to load rentals."}
            </p>
        );
    }

    const rentals: CustomerRental[] = result.data.rentals ?? [];

    if (!rentals.length) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                You don't have any rental orders yet.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {rentals.map((rental) => (
                <RentalCard
                    key={rental.id}
                    rental={rental}
                />
            ))}
        </div>
    );
}