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

import { createGear } from "../../_actions/providerGearActions";
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

type AddGearDialogProps = {
    categories: Category[];
    onGearCreated: (gear: Gear) => void;
    children: React.ReactNode;
};

export function AddGearDialog({
    categories,
    onGearCreated,
    children,
}: AddGearDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        brand: "",
        description: "",
        specifications: "",
        dailyRentalPrice: "",
        stock: "",
        image: "",
        isAvailable: true,
        categoryId: "",
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

        const stock = Number(form.stock);

        const result = await createGear({
            name: form.name,
            brand: form.brand,
            description: form.description,
            specifications: form.specifications,
            dailyRentalPrice: Number(
                form.dailyRentalPrice
            ),
            stock,
            availableStock: stock,
            image: form.image,
            isAvailable: form.isAvailable,
            categoryId: form.categoryId,
        });

        setLoading(false);

        if (!result.success) {
            toast.error(
                result.message || "Failed to add gear."
            );
            return;
        }

        toast.success("Gear added successfully.");

        onGearCreated(result.data.gear);

        setOpen(false);

        setForm({
            name: "",
            brand: "",
            description: "",
            specifications: "",
            dailyRentalPrice: "",
            stock: "",
            image: "",
            isAvailable: true,
            categoryId: "",
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        Add Gear
                    </DialogTitle>

                    <DialogDescription>
                        Add a new rental gear to your inventory.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Name
                            </Label>

                            <Input
                                id="name"
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
                            <Label htmlFor="brand">
                                Brand
                            </Label>

                            <Input
                                id="brand"
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
                        <Label htmlFor="description">
                            Description
                        </Label>

                        <Textarea
                            id="description"
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
                        <Label htmlFor="specifications">
                            Specifications
                        </Label>

                        <Textarea
                            id="specifications"
                            value={form.specifications}
                            onChange={(e) =>
                                updateField(
                                    "specifications",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="price">
                                Daily Rental Price
                            </Label>

                            <Input
                                id="price"
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
                            <Label htmlFor="stock">
                                Stock
                            </Label>

                            <Input
                                id="stock"
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
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">
                            Image URL
                        </Label>

                        <Input
                            id="image"
                            type="url"
                            placeholder="https://..."
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
                        <Label htmlFor="category">
                            Category
                        </Label>

                        <select
                            id="category"
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
                            <option value="">
                                Select category
                            </option>

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
                                Make this gear available for rental.
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
                                ? "Adding..."
                                : "Add Gear"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}