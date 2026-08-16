import { Gear } from "@/lib/types";
import { getFeaturedGears } from "../_actions/gearActions";
import GearCard from "./GearCard";

const FeaturedGear = async () => {
    const result = await getFeaturedGears();

    const gears = result.data.gear.slice(0, 8);

    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            <div className="mb-8">
                <h2 className="text-3xl font-bold">
                    Featured Gear
                </h2>

                <p className="text-muted-foreground">
                    Explore our most popular sports and outdoor equipment.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {gears.map((gear: Gear) => (
                    <GearCard
                        key={gear.id}
                        gear={gear}
                    />
                ))}
            </div>
        </section>
    );
};

export default FeaturedGear;