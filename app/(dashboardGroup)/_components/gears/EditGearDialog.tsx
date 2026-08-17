"use client";

import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { updateGear } from "../../_actions/providerGearActions";
import { toast } from "sonner";

type Category = {
    id: string;
    name: string;
};

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

type EditGearDialogProps = {
    gear: Gear;
    categories: Category[];
    onGearUpdated: (gear: Gear) => void;
    children: React.ReactNode;
};

export function EditGearDialog({
    gear,
    categories,
    onGearUpdated,
    children,
}: EditGearDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: gear.name,
        brand: gear.brand,
        description: gear.description,
        specifications: gear.specifications ?? "",
        dailyRentalPrice: String(
            gear.dailyRentalPrice
        ),
        stock: String(gear.stock),
        availableStock: String(
            gear.availableStock
        ),
        image: gear.image ?? "",
        isAvailable: gear.isAvailable,
        categoryId: gear.category.id,
    });

    const updateField = (
        field: keyof typeof form,
        value: string | boolean
    ) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setLoading(true);

        const result = await updateGear(gear.id, {
            name: form.name,
            brand: form.brand,
            description: form.description,
            specifications: form.specifications,
            dailyRentalPrice: Number(
                form.dailyRentalPrice
            ),
            stock: Number(form.stock),
            availableStock: Number(
                form.availableStock
            ),
            image: form.image,
            isAvailable: form.isAvailable,
            categoryId: form.categoryId,
        });

        setLoading(false);

        if (!result.success) {
            toast.error(
                result.message || "Failed to update gear."
            );
            return;
        }

        toast.success("Gear updated successfully.");

        onGearUpdated(result.data.gear);

        onGearUpdated(result.data.gear);

        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        Edit Gear
                    </DialogTitle>

                    <DialogDescription>
                        Update your gear information and inventory.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Name</Label>

                            <Input
                                value={form.name}
                                onChange={(e) =>
                                    updateField(
                                        "name",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Brand</Label>

                            <Input
                                value={form.brand}
                                onChange={(e) =>
                                    updateField(
                                        "brand",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>

                        <Textarea
                            value={form.description}
                            onChange={(e) =>
                                updateField(
                                    "description",
                                    e.target.value
                                )
                            }
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Specifications</Label>

                        <Textarea
                            value={form.specifications}
                            onChange={(e) =>
                                updateField(
                                    "specifications",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                            <Label>
                                Daily Price
                            </Label>

                            <Input
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.dailyRentalPrice}
                                onChange={(e) =>
                                    updateField(
                                        "dailyRentalPrice",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Stock</Label>

                            <Input
                                type="number"
                                min="0"
                                value={form.stock}
                                onChange={(e) =>
                                    updateField(
                                        "stock",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>
                                Available Stock
                            </Label>

                            <Input
                                type="number"
                                min="0"
                                value={form.availableStock}
                                onChange={(e) =>
                                    updateField(
                                        "availableStock",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Image URL</Label>

                        <Input
                            type="url"
                            value={form.image}
                            onChange={(e) =>
                                updateField(
                                    "image",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Category</Label>

                        <select
                            value={form.categoryId}
                            onChange={(e) =>
                                updateField(
                                    "categoryId",
                                    e.target.value
                                )
                            }
                            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                            required
                        >
                            {categories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label>
                                Available
                            </Label>

                            <p className="text-sm text-muted-foreground">
                                Allow customers to rent this gear.
                            </p>
                        </div>

                        <Switch
                            checked={form.isAvailable}
                            onCheckedChange={(checked) =>
                                updateField(
                                    "isAvailable",
                                    checked
                                )
                            }
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}