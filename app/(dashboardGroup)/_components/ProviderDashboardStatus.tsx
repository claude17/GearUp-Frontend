import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Clock } from "lucide-react";

type ProviderDashboardStatsProps = {
    totalGear: number;
    activeRentals: number;
    pendingOrders: number;
};

export function ProviderDashboardStats({
    totalGear,
    activeRentals,
    pendingOrders,
}: ProviderDashboardStatsProps) {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                        Total Gear Listed
                    </CardTitle>

                    <Package className="size-5 text-muted-foreground" />
                </CardHeader>

                <CardContent>
                    <p className="text-3xl font-bold">
                        {totalGear}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Gear items in your inventory
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                        Active Rentals
                    </CardTitle>

                    <ShoppingCart className="size-5 text-muted-foreground" />
                </CardHeader>

                <CardContent>
                    <p className="text-3xl font-bold">
                        {activeRentals}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Currently active rental orders
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                        Pending Orders
                    </CardTitle>

                    <Clock className="size-5 text-muted-foreground" />
                </CardHeader>

                <CardContent>
                    <p className="text-3xl font-bold">
                        {pendingOrders}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Orders waiting for confirmation
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}