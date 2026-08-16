import { Suspense } from "react";
import { ProviderOrderSkeleton } from "../../_components/orders/ProviderOrderSkeleton";
import { ProviderOrderList } from "../../_components/orders/ProviderOrderList";



export default function ProviderOrdersPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Rental Orders
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Manage rental orders for your gear.
                </p>
            </div>

            <Suspense fallback={<ProviderOrderSkeleton />}>
                <ProviderOrderList />
            </Suspense>
        </div>
    );
}