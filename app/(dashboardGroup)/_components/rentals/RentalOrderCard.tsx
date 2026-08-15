// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { CalendarDays, Package, CreditCard } from "lucide-react";
// import { PayNowButton } from "./PayNowButton";


// interface RentalOrderCardProps {
//     rental: {
//         id: string;
//         quantity: number;
//         startDate: string;
//         endDate: string;
//         totalAmount: number;
//         status: string;

//         gearItem: {
//             id: string;
//             name: string;
//             brand: string;
//             image: string | null;
//             dailyRentalPrice: number;
//         };

//         payment?: {
//             id: string;
//             amount: number;
//             status: string;
//             provider: string;
//             paidAt: string | null;
//         } | null;
//     };
// }

// export function RentalOrderCard({
//     rental,
// }: RentalOrderCardProps) {
//     const isConfirmed = rental.status === "CONFIRMED";
//     const isPaid =
//         rental.status === "PAID" ||
//         rental.payment?.status === "PAID";

//     return (
//         <Card className="overflow-hidden">
//             {/* Gear Image */}
//             <div className="relative h-52 w-full bg-muted">
//                 {rental.gearItem.image ? (
//                     <Image
//                         src={rental.gearItem.image}
//                         alt={rental.gearItem.name}
//                         fill
//                         unoptimized
//                         className="object-cover"
//                     />
//                 ) : (
//                     <div className="flex h-full items-center justify-center text-muted-foreground">
//                         No image available
//                     </div>
//                 )}
//             </div>

//             <CardHeader>
//                 <div className="flex items-start justify-between gap-4">
//                     <div>
//                         <CardTitle className="text-xl">
//                             {rental.gearItem.name}
//                         </CardTitle>

//                         <p className="mt-1 text-sm text-muted-foreground">
//                             {rental.gearItem.brand}
//                         </p>
//                     </div>

//                     <Badge
//                         variant={
//                             rental.status === "CANCELLED"
//                                 ? "destructive"
//                                 : rental.status === "CONFIRMED" ||
//                                     rental.status === "PAID"
//                                     ? "default"
//                                     : "secondary"
//                         }
//                     >
//                         {rental.status.replace("_", " ")}
//                     </Badge>
//                 </div>
//             </CardHeader>

//             <CardContent className="space-y-5">
//                 {/* Rental Information */}
//                 <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
//                     <div className="flex items-center gap-2">
//                         <CalendarDays className="size-4 text-muted-foreground" />

//                         <div>
//                             <p className="text-muted-foreground">
//                                 Start Date
//                             </p>

//                             <p className="font-medium">
//                                 {new Date(
//                                     rental.startDate
//                                 ).toLocaleDateString()}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-2">
//                         <CalendarDays className="size-4 text-muted-foreground" />

//                         <div>
//                             <p className="text-muted-foreground">
//                                 End Date
//                             </p>

//                             <p className="font-medium">
//                                 {new Date(
//                                     rental.endDate
//                                 ).toLocaleDateString()}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-2">
//                         <Package className="size-4 text-muted-foreground" />

//                         <div>
//                             <p className="text-muted-foreground">
//                                 Quantity
//                             </p>

//                             <p className="font-medium">
//                                 {rental.quantity}
//                             </p>
//                         </div>
//                     </div>

//                     <div>
//                         <p className="text-muted-foreground">
//                             Daily Price
//                         </p>

//                         <p className="font-medium">
//                             ${rental.gearItem.dailyRentalPrice}/day
//                         </p>
//                     </div>
//                 </div>

//                 {/* Total */}
//                 <div className="flex items-center justify-between border-t pt-4">
//                     <span className="font-medium">
//                         Total Amount
//                     </span>

//                     <span className="text-xl font-bold text-primary">
//                         ${rental.totalAmount.toFixed(2)}
//                     </span>
//                 </div>

//                 {/* Payment Status */}
//                 {rental.payment && (
//                     <div className="rounded-lg bg-muted p-3 text-sm">
//                         <div className="flex items-center justify-between">
//                             <span className="text-muted-foreground">
//                                 Payment Status
//                             </span>

//                             <Badge variant="outline">
//                                 {rental.payment.status}
//                             </Badge>
//                         </div>
//                     </div>
//                 )}

//                 {/* Pay Now */}
//                 {isConfirmed && !rental.payment && (
//                     <PayNowButton
//                         rentalOrderId={rental.id}
//                     />
//                 )}

//                 {/* Already Paid */}
//                 {isPaid && (
//                     <Button
//                         disabled
//                         variant="outline"
//                         className="w-full"
//                     >
//                         <CreditCard className="mr-2 size-4" />
//                         Payment Completed
//                     </Button>
//                 )}

//                 {/* Waiting for Provider */}
//                 {rental.status === "PLACED" && (
//                     <p className="text-center text-sm text-muted-foreground">
//                         Waiting for the provider to confirm your rental.
//                     </p>
//                 )}

//                 {/* Cancelled */}
//                 {rental.status === "CANCELLED" && (
//                     <p className="text-center text-sm text-destructive">
//                         This rental has been cancelled.
//                     </p>
//                 )}

//                 {/* Picked Up */}
//                 {rental.status === "PICKED_UP" && (
//                     <p className="text-center text-sm text-muted-foreground">
//                         Your gear has been picked up.
//                     </p>
//                 )}

//                 {/* Returned */}
//                 {rental.status === "RETURNED" && (
//                     <p className="text-center text-sm text-muted-foreground">
//                         This rental has been returned.
//                     </p>
//                 )}
//             </CardContent>
//         </Card>
//     );
// }