"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createRental } from "../_actions/rentActions";



type RentGearDialogProps = {
  gearId: string;
  gearName: string;
  dailyRentalPrice: number;
  availableStock: number;
};

export default function RentGearDialog({
  gearId,
  gearName,
  dailyRentalPrice,
  availableStock,
}: RentGearDialogProps) {
  const [open, setOpen] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!open) {
      setQuantity(1);
      setStartDate("");
      setEndDate("");
    }
  }, [open]);

  const handleQuantityDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleQuantityIncrease = () => {
    setQuantity((prev) =>
      Math.min(availableStock, prev + 1)
    );
  };

  const calculateDays = () => {
    if (!startDate || !endDate) {
      return 0;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const difference =
      end.getTime() - start.getTime();

    const days = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    return days > 0 ? days : 0;
  };

  const totalDays = calculateDays();

  const totalAmount =
    totalDays * dailyRentalPrice * quantity;

  const handleRent = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select rental dates.");
      return;
    }

    if (quantity < 1) {
      toast.error("Quantity must be at least 1.");
      return;
    }

    if (quantity > availableStock) {
      toast.error("Not enough stock available.");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      toast.error("End date must be after start date.");
      return;
    }

    try {
      setPending(true);

      const result = await createRental(
        gearId,
        quantity,
        startDate,
        endDate
      );

      if (!result.success) {
        toast.error(
          result.message || "Failed to create rental."
        );
        return;
      }

      toast.success(
        result.message || "Rental created successfully!"
      );

      setOpen(false);
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full"
          disabled={availableStock <= 0}
        >
          Rent This Gear
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Rent {gearName}
          </DialogTitle>

          <DialogDescription>
            Select your rental dates and quantity.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">

          {/* Quantity */}
          <div className="space-y-2">
            <Label>Quantity</Label>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleQuantityDecrease}
                disabled={quantity <= 1}
              >
                <Minus />
              </Button>

              <Input
                type="number"
                min={1}
                max={availableStock}
                value={quantity}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (value < 1) {
                    setQuantity(1);
                  } else if (value > availableStock) {
                    setQuantity(availableStock);
                  } else {
                    setQuantity(value);
                  }
                }}
                className="text-center"
              />

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleQuantityIncrease}
                disabled={quantity >= availableStock}
              >
                <Plus />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              {availableStock} item(s) available
            </p>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="startDate">
              Start Date
            </Label>

            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(e.target.value)
                }
                className="pl-10"
              />
            </div>
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label htmlFor="endDate">
              End Date
            </Label>

            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) =>
                  setEndDate(e.target.value)
                }
                className="pl-10"
              />
            </div>
          </div>

          {/* Rental Summary */}
          {totalDays > 0 && (
            <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Daily price</span>
                <span>
                  ${dailyRentalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Days</span>
                <span>{totalDays}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Quantity</span>
                <span>{quantity}</span>
              </div>

              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={pending}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleRent}
            disabled={
              pending ||
              !startDate ||
              !endDate ||
              availableStock <= 0
            }
          >
            {pending ? "Renting..." : "Confirm Rental"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}