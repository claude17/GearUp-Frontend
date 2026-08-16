"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";

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
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "../../_actions/reviewActions";


type ReviewDialogProps = {
    rentalId: string;
    gearName: string;
    onReviewCreated?: () => void;
    onReviewSubmitted: () => void;
};

export function ReviewDialog({
    rentalId,
    gearName,
    onReviewCreated,
    onReviewSubmitted,
}: ReviewDialogProps) {

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!rating) {
            toast.error("Please select a rating.");
            return;
        }

        if (!comment.trim()) {
            toast.error("Please write a comment.");
            return;
        }

        setLoading(true);

        const result = await createReview({
            rentalOrderId: rentalId,
            rating,
            comment: comment.trim(),
        });

        setLoading(false);

        if (!result.success) {
            toast.error(
                result.message || "Failed to submit review."
            );
            return;
        }

        toast.success("Review submitted successfully!");
        onReviewSubmitted();

        setOpen(false);
        setRating(5);
        setComment("");

        onReviewCreated?.();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">
                    Leave Review
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Review {gearName}
                    </DialogTitle>

                    <DialogDescription>
                        Tell us about your rental experience.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    {/* Rating */}
                    <div className="space-y-2">
                        <p className="text-sm font-medium">
                            Rating
                        </p>

                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() =>
                                        setRating(star)
                                    }
                                    className="cursor-pointer"
                                    aria-label={`${star} star`}
                                >
                                    <Star
                                        className={`size-7 ${
                                            star <= rating
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-muted-foreground"
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="space-y-2">
                        <label
                            htmlFor="review-comment"
                            className="text-sm font-medium"
                        >
                            Comment
                        </label>

                        <Textarea
                            id="review-comment"
                            placeholder="How was your rental experience?"
                            value={comment}
                            onChange={(e) =>
                                setComment(e.target.value)
                            }
                            rows={5}
                            required
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
                                ? "Submitting..."
                                : "Submit Review"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}