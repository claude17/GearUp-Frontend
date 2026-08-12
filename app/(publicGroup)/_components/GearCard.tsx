import Image from "next/image";

import { Gear } from "@/lib/types";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const GearCard = ({
    gear,
}: {
    gear: Gear;
}) => {
    return (
        <Link href={`/gear/${gear.id}`} className="block">
        <Card className="overflow-hidden p-0 transition-shadow hover:shadow-lg cursor-pointer">

            <div className="relative h-48 w-full">
                <Image
                    src={gear.image}
                    alt={gear.name}
                    width={300}
                    height={300}
                    loading="eager"
                    unoptimized
                    className="h-full w-full object-cover"
                />
            </div>

            <CardContent className="space-y-3 px-5 pb-5 pt-0">

                <div>
                    <h3 className="text-lg font-semibold">
                        {gear.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        Brand: {gear.brand}
                    </p>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span>
                        Category: {gear.category.name}
                    </span>

                    <span>
                        Stock: {gear.availableStock}
                    </span>
                </div>

                <div className="flex items-center justify-between">

                    <span className="font-semibold text-primary">
                        Price: ${gear.dailyRentalPrice}/day
                    </span>

                    <Badge
                        className={
                            gear.isAvailable
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }
                    >
                        {gear.isAvailable
                            ? "Available"
                            : "Unavailable"}
                    </Badge>

                </div>

            </CardContent>

        </Card>
        </Link>
    );
};

export default GearCard;