import { CustomerRental } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

type PaymentHistoryProps = {
    rentals: CustomerRental[];
};

export function PaymentHistory({
    rentals,
}: PaymentHistoryProps) {

    const payments = rentals.filter(
        (rental) => rental.payment
    );

    if (!payments.length) {
        return (
            <div className="rounded-xl border border-dashed p-10 text-center">
                <p className="text-muted-foreground">
                    No payment history yet.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
                <thead className="border-b bg-muted/50">
                    <tr>
                        <th className="px-4 py-3 text-left">
                            Gear
                        </th>

                        <th className="px-4 py-3 text-left">
                            Amount
                        </th>

                        <th className="px-4 py-3 text-left">
                            Provider
                        </th>

                        <th className="px-4 py-3 text-left">
                            Status
                        </th>

                        <th className="px-4 py-3 text-left">
                            Paid At
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {payments.map((rental) => (
                        <tr
                            key={rental.payment!.id}
                            className="border-b last:border-0"
                        >
                            <td className="px-4 py-3 font-medium">
                                {rental.gearItem.name}
                            </td>

                            <td className="px-4 py-3">
                                ${rental.payment!.amount.toFixed(2)}
                            </td>

                            <td className="px-4 py-3">
                                {rental.payment!.provider}
                            </td>

                            <td className="px-4 py-3">
                                <Badge variant="outline">
                                    {rental.payment!.status}
                                </Badge>
                            </td>

                            <td className="px-4 py-3">
                                {rental.payment!.paidAt
                                    ? new Date(
                                          rental.payment!.paidAt
                                      ).toLocaleDateString()
                                    : "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}