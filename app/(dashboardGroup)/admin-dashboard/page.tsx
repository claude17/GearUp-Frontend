

import { getAllGears } from "@/app/(publicGroup)/_actions/gearActions";
import { getAllUsers } from "../_actions/adminActions";
import { AdminDashboardStats } from "../_components/AdminDashboardStatus";
import { getAllRentals } from "../_actions/rentalActions";



export default async function AdminDashboardPage() {
    const [
        usersResult,
        gearsResult,
        rentalsResult,
    ] = await Promise.all([
        getAllUsers(),
        getAllGears(),
        getAllRentals(),
    ]);

    const totalUsers = usersResult.success
        ? usersResult.data.profiles.length
        : 0;

    const activeGear = gearsResult.success
        ? gearsResult.data.gear.filter(
              (gear: any) => gear.isAvailable
          ).length
        : 0;

    const totalRentals = rentalsResult.success
        ? rentalsResult.data.rentals.length
        : 0;

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Admin Dashboard
                </h1>

                <p className="mt-1 text-muted-foreground">
                    Global overview of the GearUp platform.
                </p>
            </div>

            <AdminDashboardStats
                totalUsers={totalUsers}
                activeGear={activeGear}
                totalRentals={totalRentals}
            />
        </div>
    );
}