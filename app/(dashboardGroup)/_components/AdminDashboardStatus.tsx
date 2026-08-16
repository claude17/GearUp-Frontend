import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Users,
    Package,
    ShoppingCart,
} from "lucide-react";

type AdminDashboardStatsProps = {
    totalUsers: number;
    activeGear: number;
    totalRentals: number;
};

export function AdminDashboardStats({
    totalUsers,
    activeGear,
    totalRentals,
}: AdminDashboardStatsProps) {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            {/* Total Users */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                        Total Users
                    </CardTitle>

                    <Users className="size-5 text-muted-foreground" />
                </CardHeader>

                <CardContent>
                    <p className="text-3xl font-bold">
                        {totalUsers}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Registered users on the platform
                    </p>
                </CardContent>
            </Card>

            {/* Active Gear */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                        Active Gear
                    </CardTitle>

                    <Package className="size-5 text-muted-foreground" />
                </CardHeader>

                <CardContent>
                    <p className="text-3xl font-bold">
                        {activeGear}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Gear currently available for rental
                    </p>
                </CardContent>
            </Card>

            {/* Total Rentals */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                        Total Rentals
                    </CardTitle>

                    <ShoppingCart className="size-5 text-muted-foreground" />
                </CardHeader>

                <CardContent>
                    <p className="text-3xl font-bold">
                        {totalRentals}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Rental orders on the platform
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}