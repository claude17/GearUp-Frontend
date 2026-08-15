import {
    LayoutDashboard,
    Users,
} from "lucide-react";

import { ISidebarItem } from "@/lib/types";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label: "Dashboard",
        href: "/admin-dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "User Management",
        href: "/admin-dashboard/admin",
        icon: Users,
    },
];