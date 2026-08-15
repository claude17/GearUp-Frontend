"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { ProviderGearCard } from "./ProviderGearCard";
import { AddGearDialog } from "./AddGearDialog";

type Gear = {
    id: string;
    name: string;
    brand: string;
    description: string;
    specifications: string | null;
    dailyRentalPrice: number;
    stock: number;
    availableStock: number;
    image: string | null;
    isAvailable: boolean;
    category: {
        id: string;
        name: string;
    };
};

type Category = {
    id: string;
    name: string;
};

type ProviderGearListProps = {
    initialGears: Gear[];
    categories: Category[];
};

export function ProviderGearList({
    initialGears,
    categories,
}: ProviderGearListProps) {
    const [gears, setGears] = useState(initialGears);

    const handleGearCreated = (gear: Gear) => {
        setGears((current) => [gear, ...current]);
    };

    const handleGearUpdated = (updatedGear: Gear) => {
        setGears((current) =>
            current.map((gear) =>
                gear.id === updatedGear.id
                    ? updatedGear
                    : gear
            )
        );
    };

    const handleGearDeleted = (gearId: string) => {
        setGears((current) =>
            current.filter((gear) => gear.id !== gearId)
        );
    };

    return (
        <>
            <div className="mb-6 flex justify-end">
                <AddGearDialog
                    categories={categories}
                    onGearCreated={handleGearCreated}
                >
                    <Button>
                        <Plus className="mr-2 size-4" />
                        Add Gear
                    </Button>
                </AddGearDialog>
            </div>

            {gears.length === 0 ? (
                <div className="rounded-xl border border-dashed p-12 text-center">
                    <h2 className="text-lg font-semibold">
                        No gears yet
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Add your first gear to start receiving rental orders.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {gears.map((gear) => (
                        <ProviderGearCard
                            key={gear.id}
                            gear={gear}
                            categories={categories}
                            onGearUpdated={handleGearUpdated}
                            onGearDeleted={handleGearDeleted}
                        />
                    ))}
                </div>
            )}
        </>
    );
}