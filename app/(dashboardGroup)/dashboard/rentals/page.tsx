import { RentalList } from "../../_components/rentals/RentalList";


export default function RentalsPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    My Rentals
                </h1>

                <p className="text-muted-foreground">
                    View and manage your rental orders.
                </p>
            </div>

            <RentalList />
        </div>
    );
}