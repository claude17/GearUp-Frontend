
import { ProviderOrder } from "@/lib/types";
import { getProviderOrders } from "../../_actions/providerGearActions";
import { ProviderOrderCard } from "./ProviderOrderCard";

export async function ProviderOrderList() {
    const result = await getProviderOrders();

    if (!result.success) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                {result.message || "Failed to load orders."}
            </p>
        );
    }

    const orders: ProviderOrder[] = result.data.rentals;

    if (!orders.length) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                You don't have any rental orders yet.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {orders.map((order) => (
                <ProviderOrderCard
                    key={order.id}
                    order={order}
                />
            ))}
        </div>
    );
}