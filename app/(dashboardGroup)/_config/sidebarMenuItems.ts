import { FileText, LayoutDashboard } from "lucide-react";


import { ISidebarItem } from "@/lib/types";
import { PROVIDER_SIDEBAR_ITEMS } from "./providerSIdebarItems";
import { ADMIN_SIDEBAR_ITEMS } from "./adminSidebarItems";

const CUSTOMER_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "My Rentals",
        href: "/dashboard/rentals",
        icon: FileText,
    },
];

export const sidebarMenuItems = {
    CUSTOMER: CUSTOMER_SIDEBAR_ITEMS,
    PROVIDER: PROVIDER_SIDEBAR_ITEMS,
    ADMIN: ADMIN_SIDEBAR_ITEMS,
};