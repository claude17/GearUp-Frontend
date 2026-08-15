import { getAllGears, getCategories } from "../_actions/gearActions";

import GearFilter from "../_components/GearFilter";
import GearGrid from "../_components/GearGrid";


type SearchParams = Promise<{
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
}>;

export default async function GearPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const params = await searchParams;

    const query = new URLSearchParams();

    if (params.category)
        query.set("category", params.category);

    if (params.brand)
        query.set("brand", params.brand);

    if (params.minPrice)
        query.set("minPrice", params.minPrice);

    if (params.maxPrice)
        query.set("maxPrice", params.maxPrice);

    const [gearResult, categoryResult] = await Promise.all([
        getAllGears(
            query.toString() ? `?${query.toString()}` : ""
        ),
        getCategories(),
    ]);

    

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">

            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-4xl font-bold">
                        Browse Gear
                    </h1>

                    <p className="text-muted-foreground">
                        Find the perfect equipment for your next adventure.
                    </p>
                </div>


            </div>

            {/* Content */}
            <div className="grid gap-8 lg:grid-cols-4">

                <GearFilter
                    categories={categoryResult.data.categories}
                />

                <GearGrid
                    gears={gearResult.data.gear}
                />

            </div>

        </div>
    );
}