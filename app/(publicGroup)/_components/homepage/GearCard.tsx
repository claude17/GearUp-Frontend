import { Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type GearItem = {
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

export function GearCard({ gear }: { gear: GearItem; }) {
    return (
        <Link href={`/gear/${gear.id}`} className="block">
            <article className="group overflow-hidden rounded-2xl border bg-card">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {gear.image ? (
                        <img
                            src={gear.image}
                            alt={gear.name}
                            className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex size-full items-center justify-center text-muted-foreground">
                            No image
                        </div>
                    )}

                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                        <Badge
                            variant={
                                gear.isAvailable
                                    ? "secondary"
                                    : "destructive"
                            }
                            className="bg-background/90"
                        >
                            {gear.isAvailable
                                ? "Available"
                                : "Unavailable"}
                        </Badge>

                        {/* <Button
                            variant="secondary"
                            size="icon"
                            className="size-9 rounded-full bg-background/90"
                            aria-label={`Save ${gear.name}`}
                        >
                            <Heart />
                        </Button> */}
                    </div>
                </div>

                <div className="flex flex-col gap-3 p-5">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                {gear.category.name}
                            </p>

                            <h3 className="mt-1 text-lg font-semibold tracking-tight">
                                {gear.name}
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {gear.brand}
                            </p>
                        </div>

                        <p className="whitespace-nowrap text-sm">
                            <span className="text-xl font-bold">
                                ${gear.dailyRentalPrice}
                            </span>{" "}
                            / day
                        </p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                            {gear.availableStock} available
                        </span>

                        {/* <span className="flex items-center gap-1 text-foreground">
                            <Star className="size-4" />
                            New
                        </span> */}
                    </div>
                </div>
            </article>
        </Link>
    );
}