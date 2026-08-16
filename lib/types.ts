import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type Gear = {
    id: string;
    name: string;
    brand: string;
    description: string;
    specifications: string;
    dailyRentalPrice: number;
    stock: number;
    availableStock: number;
    image: string;
    isAvailable: boolean;

    category: {
        id: string;
        name: string;
    };

    provider: {
        id: string;
        name: string;
        email: string;
    };

    reviews: {
        id: string;
        createdAt: string;
        updatedAt: string;
        customerId: string;
        rating: number;
        comment: string;

        customer: {
            id: string;
            name: string;
            email: string;
        };
    }[];
};



export type IUser = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        profile: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            address: string | null;
            profileImage: string | null;
            role: "CUSTOMER" | "PROVIDER" | "ADMIN";
            status: "ACTIVE" | "SUSPENDED";
            createdAt: string;
            updatedAt: string;
        };
    };
};

export type NavbarProps = {
    user: IUser;
};

export type ProviderOrder = {
    id: string;
    quantity: number;
    startDate: string;
    endDate: string;
    totalAmount: number;
    status:
    | "PLACED"
    | "CONFIRMED"
    | "PAID"
    | "PICKED_UP"
    | "RETURNED"
    | "CANCELLED";

    customer: {
        id: string;
        name: string;
        email: string;
    };

    gearItem: {
        id: string;
        name: string;
        brand: string;
        image: string | null;
        dailyRentalPrice: number;
    };

    payment?: {
        id: string;
        amount: number;
        status: string;
        provider: string;
        paidAt: string | null;
    } | null;
};

export type ProviderOrderCardProps = {
    order: ProviderOrder;
};

export type RentalStatus =
    | "PLACED"
    | "CONFIRMED"
    | "PAID"
    | "PICKED_UP"
    | "RETURNED"
    | "CANCELLED";

export type CustomerRental = {
    id: string;
    customerId: string;
    providerId: string;
    gearItemId: string;
    quantity: number;
    startDate: string;
    endDate: string;
    totalAmount: number;
    status: RentalStatus;
    createdAt: string;
    updatedAt: string;

    gearItem: {
        id: string;
        name: string;
        brand: string;
        image: string | null;
        dailyRentalPrice: number;
    };

    provider?: {
        id: string;
        name: string;
        email: string;
    };

    payment?: {
        id: string;
        amount: number;
        status: string;
        provider: string;
        paidAt: string | null;
    } | null;

    review: {
        id: string;
        rating: number;
        comment: string;
        createdAt: string;
    } | null;
};

export type ISidebarItem = {
    label: string,
    href: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
};