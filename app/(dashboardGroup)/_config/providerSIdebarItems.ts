import {
    LayoutDashboard,
    Package,
    ShoppingCart,
} from "lucide-react";

import { ISidebarItem } from "@/lib/types";

export const PROVIDER_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label: "Dashboard",
        href: "/provider-dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "My Gears",
        href: "/provider-dashboard/gears",
        icon: Package,
    },
    {
        label: "Rental Orders",
        href: "/provider-dashboard/orders",
        icon: ShoppingCart,
    },
];