import {
    getMyGears,
    getCategories,
} from "../../_actions/providerGearActions";

import { ProviderGearList } from "../../_components/gears/ProviderGearList";

export default async function ProviderGearsPage() {
    const [gearResult, categoryResult] = await Promise.all([
        getMyGears(),
        getCategories(),
    ]);

    if (!gearResult.success) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-10">
                <p className="text-center text-muted-foreground">
                    {gearResult.message ||
                        "Failed to load your gears."}
                </p>
            </div>
        );
    }

    if (!categoryResult.success) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-10">
                <p className="text-center text-muted-foreground">
                    {categoryResult.message ||
                        "Failed to load categories."}
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    My Gears
                </h1>

                <p className="mt-1 text-muted-foreground">
                    Manage the sports and outdoor gear you
                    provide.
                </p>
            </div>

            <ProviderGearList
                initialGears={gearResult.data.gear}
                categories={categoryResult.data.categories}
            />
        </div>
    );
}