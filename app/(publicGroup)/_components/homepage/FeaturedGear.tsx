import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GearCard } from "./GearCard";
import { getFeaturedGears } from "../../_actions/gearActions";
import { Gear } from "@/lib/types";
import Link from "next/link";

export async function FeaturedGear() {
    const result = await getFeaturedGears();

    if (!result.success) {
        return null;
    }

    const gear = result.data.gear;

    return (
        <section
            className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
            id="featured"
        >
            <div className="mb-10 flex items-end justify-between gap-6">
                <div>
                    <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
                        Curated nearby
                    </p>

                    <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                        Ready for your next trip
                    </h2>
                </div>

                <Link href="/gear">
                    <Button
                        variant="outline"
                        className="hidden sm:inline-flex cursor-pointer"
                    >
                        View all gear
                        <ArrowUpRight data-icon="inline-end" />
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {gear.map((item: Gear) => (
                    <GearCard
                        key={item.id}
                        gear={item}
                    />
                ))}
            </div>
        </section>
    );
}