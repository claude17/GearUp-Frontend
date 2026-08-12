"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Category = {
    id: string;
    name: string;
    description: string;
};

const GearFilter = ({
    categories,
}: {
    categories: Category[];
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [brand, setBrand] = useState(
        searchParams.get("brand") ?? ""
    );

    const [category, setCategory] = useState(
        searchParams.get("category") ?? ""
    );

    const [minPrice, setMinPrice] = useState(
        searchParams.get("minPrice") ?? ""
    );

    const [maxPrice, setMaxPrice] = useState(
        searchParams.get("maxPrice") ?? ""
    );

    const handleFilter = () => {
        const params = new URLSearchParams();

        if (brand) params.set("brand", brand);

        if (category) params.set("category", category);

        if (minPrice) params.set("minPrice", minPrice);

        if (maxPrice) params.set("maxPrice", maxPrice);

        router.push(`/gear?${params.toString()}`);
    };

    const handleReset = () => {
        setBrand("");
        setCategory("");
        setMinPrice("");
        setMaxPrice("");

        router.push("/gear");
    };

    return (
        <aside className="space-y-5 rounded-lg border p-5 h-fit">

            <div>
                <h2 className="text-xl font-semibold">
                    Filters
                </h2>

                <p className="text-sm text-muted-foreground">
                    Narrow down your search.
                </p>
            </div>

            {/* Brand */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Brand
                </label>

                <Input
                    placeholder="e.g. Trek"
                    value={brand}
                    onChange={(e) =>
                        setBrand(e.target.value)
                    }
                />
            </div>

            {/* Category */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Category
                </label>

                <Select
                    value={category}
                    onValueChange={(value) =>
                        setCategory(value ?? "")
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Categories" />
                    </SelectTrigger>

                    <SelectContent>

                        <SelectItem value="">
                            All Categories
                        </SelectItem>

                        {categories.map((category) => (
                            <SelectItem
                                key={category.id}
                                value={category.name}
                            >
                                {category.name}
                            </SelectItem>
                        ))}

                    </SelectContent>
                </Select>
            </div>

            {/* Price */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Minimum Price
                </label>

                <Input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) =>
                        setMinPrice(e.target.value)
                    }
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Maximum Price
                </label>

                <Input
                    type="number"
                    placeholder="100"
                    value={maxPrice}
                    onChange={(e) =>
                        setMaxPrice(e.target.value)
                    }
                />
            </div>

            <div className="space-y-3 pt-2">

                <Button
                    className="w-full cursor-pointer"
                    onClick={handleFilter}
                >
                    Apply Filters
                </Button>

                <Button
                    variant="outline"
                    className="w-full cursor-pointer"
                    onClick={handleReset}
                >
                    Reset
                </Button>

            </div>

        </aside>
    );
};

export default GearFilter;