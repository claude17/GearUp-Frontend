import {
    getMyGears,
    getProviderOrders,
} from "../_actions/providerGearActions";
import { ProviderDashboardStats } from "../_components/ProviderDashboardStatus";



export default async function ProviderDashboardPage() {
    const [gearResult, orderResult] = await Promise.all([
        getMyGears(),
        getProviderOrders(),
    ]);

    const totalGear = gearResult.success
        ? gearResult.data.gear.length
        : 0;

    const rentals = orderResult.success
        ? orderResult.data.rentals
        : [];

    const activeRentals = rentals.filter(
        (rental: any) =>
            rental.status === "CONFIRMED" ||
            rental.status === "PAID" ||
            rental.status === "PICKED_UP"
    ).length;

    const pendingOrders = rentals.filter(
        (rental: any) =>
            rental.status === "PLACED"
    ).length;

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Provider Dashboard
                </h1>

                <p className="mt-1 text-muted-foreground">
                    Overview of your gear and rental activity.
                </p>
            </div>

            <ProviderDashboardStats
                totalGear={totalGear}
                activeRentals={activeRentals}
                pendingOrders={pendingOrders}
            />
        </div>
    );
}