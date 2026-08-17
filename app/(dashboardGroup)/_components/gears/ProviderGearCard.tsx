"use client";
import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { deleteGear } from "../../_actions/providerGearActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { EditGearDialog } from "./EditGearDialog";
import { toast } from "sonner";

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

type ProviderGearCardProps = {
    gear: Gear;
    categories: Category[];
    onGearUpdated: (gear: Gear) => void;
    onGearDeleted: (gearId: string) => void;
};

export function ProviderGearCard({
    gear,
    categories,
    onGearUpdated,
    onGearDeleted,
}: ProviderGearCardProps) {
    const [deleting, setDeleting] = useState(false);
    return (

        <Card className="overflow-hidden">
            {gear.image ? (
                <div className="relative h-52 w-full">
                    <Image
                        src={gear.image}
                        alt={gear.name}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                </div>
            ) : (
                <div className="flex h-52 items-center justify-center bg-muted text-muted-foreground">
                    No image
                </div>
            )}

            <CardHeader>
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <CardTitle>
                            {gear.name}
                        </CardTitle>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {gear.brand}
                        </p>
                    </div>

                    <Badge
                        variant={
                            gear.isAvailable
                                ? "default"
                                : "secondary"
                        }
                    >
                        {gear.isAvailable
                            ? "Available"
                            : "Unavailable"}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                <p className="line-clamp-2 text-sm text-muted-foreground">
                    {gear.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                        <p className="text-muted-foreground">
                            Category
                        </p>

                        <p className="font-medium">
                            {gear.category.name}
                        </p>
                    </div>

                    <div>
                        <p className="text-muted-foreground">
                            Price
                        </p>

                        <p className="font-medium">
                            ${gear.dailyRentalPrice}/day
                        </p>
                    </div>

                    <div>
                        <p className="text-muted-foreground">
                            Stock
                        </p>

                        <p className="font-medium">
                            {gear.stock}
                        </p>
                    </div>

                    <div>
                        <p className="text-muted-foreground">
                            Available
                        </p>

                        <p className="font-medium">
                            {gear.availableStock}
                        </p>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex gap-2">
                <EditGearDialog
                    gear={gear}
                    categories={categories}
                    onGearUpdated={onGearUpdated}
                >
                    <Button
                        variant="outline"
                        className="flex-1"
                    >
                        <Pencil className="mr-2 size-4" />
                        Edit
                    </Button>
                </EditGearDialog>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="destructive"
                            size="icon"
                            disabled={deleting}
                            title="Delete gear"
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Delete this gear?
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                                Are you sure you want to delete{" "}
                                <span className="font-semibold">
                                    {gear.name}
                                </span>
                                ? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel>
                                No
                            </AlertDialogCancel>

                            <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                disabled={deleting}
                                onClick={async () => {
                                    setDeleting(true);

                                    const result = await deleteGear(
                                        gear.id
                                    );

                                    if (!result.success) {
                                        setDeleting(false);

                                        // We'll improve this with a toast later
                                        toast.error(
                                            result.message ||
                                            "Failed to delete gear."
                                        );

                                        return;
                                    }

                                    onGearDeleted(gear.id);
                                    setDeleting(false);
                                    toast.success("Gear deleted successfully.");
                                }}
                            >
                                {deleting ? "Deleting..." : "Yes, Delete"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
}