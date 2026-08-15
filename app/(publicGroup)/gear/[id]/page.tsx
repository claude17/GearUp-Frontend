import Image from "next/image";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { getGearById } from "../../_actions/gearActions";
import { Gear } from "@/lib/types";
import RentGearDialog from "../../_components/RentGearDialog";

export default async function GearDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getGearById(id);

  if (!result.success || !result.data?.gear) {
    notFound();
  }

  const gear:Gear = result.data.gear;

  const isAvailable =
    gear.isAvailable && gear.availableStock > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Page content */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gear Image */}
        <Card className="overflow-hidden py-0">
          {gear.image ? (
            <Image
              src={gear.image}
              alt={gear.name}
              width={800}
              height={800}
              unoptimized
              className="h-[500px] w-full object-cover"
            />
          ) : (
            <div className="flex h-[500px] items-center justify-center bg-muted text-muted-foreground">
              No image available
            </div>
          )}
        </Card>

        {/* Gear Details */}
        <Card>
          <CardContent className="flex h-full flex-col justify-center gap-6 p-6">
            {/* Category + Availability */}
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {gear.category.name}
              </Badge>

              <Badge
                variant={isAvailable ? "default" : "destructive"}
              >
                {isAvailable
                  ? "Available"
                  : "Currently unavailable"}
              </Badge>
            </div>

            {/* Name */}
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                {gear.name}
              </h1>

              <p className="mt-2 text-lg text-muted-foreground">
                {gear.brand}
              </p>
            </div>

            {/* Price */}
            <div>
              <span className="text-3xl font-bold text-primary">
                ${gear.dailyRentalPrice}
              </span>

              <span className="ml-1 text-sm text-muted-foreground">
                / day
              </span>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h2 className="font-semibold">
                Description
              </h2>

              <p className="leading-6 text-muted-foreground">
                {gear.description}
              </p>
            </div>

            {/* Specifications */}
            {gear.specifications && (
              <div className="space-y-2">
                <h2 className="font-semibold">
                  Specifications
                </h2>

                <p className="whitespace-pre-line leading-6 text-muted-foreground">
                  {gear.specifications}
                </p>
              </div>
            )}

            {/* Stock */}
            <div className="flex items-center gap-6 border-t pt-4">
              <div className="text-sm">
                <span className="font-medium">
                  Available Stock:
                </span>{" "}
                <span className="text-muted-foreground">
                  {gear.availableStock}
                </span>
              </div>

              <div className="text-sm">
                <span className="font-medium">
                  Total Stock:
                </span>{" "}
                <span className="text-muted-foreground">
                  {gear.stock}
                </span>
              </div>
            </div>

            {/* Rent CTA */}
<RentGearDialog
  gearId={gear.id}
  gearName={gear.name}
  dailyRentalPrice={gear.dailyRentalPrice}
  availableStock={gear.availableStock}
/>
          </CardContent>
        </Card>
      </div>

      {/* Provider */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <h2 className="font-semibold">
            Provided by
          </h2>

          <div className="mt-2 space-y-1">
            <p>{gear.provider.name}</p>

            <p className="text-sm text-muted-foreground">
              {gear.provider.email}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Reviews */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">
          Reviews
        </h2>

        {gear.reviews.length === 0 ? (
          <p className="mt-4 text-muted-foreground">
            No reviews yet.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {gear.reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                     {/* Reviewer */}
            <div className="flex items-center justify-between">
              <div className="font-bold">
                {review.customer.name}
              </div>
              
              <span className="text-xs text-muted-foreground">
                      {new Date(
                        review.createdAt
                      ).toLocaleDateString()}
                    </span>
              
            </div>
            <div className="text-sm text-muted-foreground">
                {review.customer.email}
              </div>
                    <div className="font-medium text-yellow-500">
                      {"★".repeat(review.rating)}
                    </div>

            
                  {review.comment && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}