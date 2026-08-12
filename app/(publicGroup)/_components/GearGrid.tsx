"use client"
import GearCard from "./GearCard";
import { Gear } from "@/lib/types";

const GearGrid = ({
    gears,
}: {
    gears: Gear[];
}) => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 lg:col-span-3">
            
            
            {gears.map((gear) => (
                <GearCard
                    key={gear.id}
                    gear={gear}
                />
            ))}

        </div>
    );
};

export default GearGrid;