import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type SearchParams = Promise<{
    session_id?: string;
}>;

export default async function PaymentSuccessPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const { session_id } = await searchParams;

    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
            <Card className="w-full max-w-md text-center">
                <CardHeader className="items-center">
                    <CheckCircle2 className="size-16 text-green-600" />

                    <CardTitle className="text-2xl">
                        Payment Successful!
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <p className="text-muted-foreground">
                        Your rental payment has been completed successfully.
                    </p>

                    {session_id && (
                        <div className="rounded-lg bg-muted p-3 text-left">
                            <p className="text-xs text-muted-foreground">
                                Payment Session
                            </p>

                            <p className="mt-1 break-all text-sm font-medium">
                                {session_id}
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button asChild>
                            <Link href="/dashboard/rentals">
                                View My Rentals
                            </Link>
                        </Button>

                        <Button variant="outline" asChild>
                            <Link href="/gear">
                                Browse More Gear
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}