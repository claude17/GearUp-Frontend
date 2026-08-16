"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { useRef } from "react";

export default function GearSearch() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const debouncedReference =
        useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleChange = (value: string) => {
        // Cancel the previous timer
        if (debouncedReference.current) {
            clearTimeout(debouncedReference.current);
        }

        // Start a new 500ms timer
        debouncedReference.current = setTimeout(() => {
            const params = new URLSearchParams(
                searchParams.toString()
            );

            if (value.trim()) {
                params.set("search", value.trim());
            } else {
                params.delete("search");
            }

            router.replace(
                `${pathname}?${params.toString()}`
            );
        }, 500);
    };

    return (
        <div className="relative ml-auto mb-8 w-full max-w-sm">
            <SearchIcon
                className="
                    pointer-events-none
                    absolute
                    top-1/2
                    left-3
                    size-4
                    -translate-y-1/2
                    text-muted-foreground
                "
            />

            <Input
                defaultValue={
                    searchParams.get("search") ?? ""
                }
                onChange={(e) =>
                    handleChange(e.target.value)
                }
                placeholder="Search gear..."
                className="pl-9"
            />
        </div>
    );
}