
import { getMyRentals } from "../_actions/rentalActions";
import { CustomerRentalList } from "../_components/CustomerRentalList";
import { PaymentHistory } from "../_components/PaymentHistory";


export default async function CustomerDashboard() {
    const result = await getMyRentals();

    if (!result.success) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-10">
                <p className="text-center text-muted-foreground">
                    {result.message || "Failed to load your rentals."}
                </p>
            </div>
        );
    }

    const rentals = result.data.rentals;

    return (
        <div className="mx-auto max-w-7xl space-y-10 px-4 py-10">

            <div>
                <h1 className="text-3xl font-bold">
                    Customer Dashboard
                </h1>

                <p className="mt-1 text-muted-foreground">
                    Manage your rentals, payments and reviews.
                </p>
            </div>

            {/* Rental History */}
            <section>
                <h2 className="mb-4 text-2xl font-semibold">
                    Rental Orders
                </h2>

                <CustomerRentalList rentals={rentals} />
            </section>

            {/* Payment History */}
            <section>
                <h2 className="mb-4 text-2xl font-semibold">
                    Payment History
                </h2>

                <PaymentHistory rentals={rentals} />
            </section>

        </div>
    );
}