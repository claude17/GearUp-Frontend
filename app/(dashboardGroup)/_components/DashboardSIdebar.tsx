"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { ISidebarItem, NavbarProps } from "@/lib/types";
import { Newspaper,Podcast } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenuItems } from "../_config/sidebarMenuItems";


// const navItems = [
//   {
//     label: "My Posts",
//     href: "/dashboard/my-posts",
//     icon: Podcast,
//   },
//   {
//     label: "My Profile",
//     href: "/dashboard/my-profile",
//     icon: Podcast,
//   },
// ];

export default function DashboardSidebar({user}:NavbarProps) {
  const pathname = usePathname();

    // const navItems = sidebarMenuItems.USER;
    let navItems: ISidebarItem[] = []
    if (user.data.profile.role === "CUSTOMER") {
        navItems=sidebarMenuItems.CUSTOMER
    } else if (user.data.profile.role === "PROVIDER") {
        navItems=sidebarMenuItems.PROVIDER
    } else if (user.data.profile.role === "ADMIN") {
        navItems=sidebarMenuItems.ADMIN
    }

  return (
    <Sidebar
      collapsible="none"
      className=" h-[calc(100svh-0rem)] border-r border-sidebar-border"
    >
       {/* GearUp Logo */}
      {/* <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-12"
            >
              <Link href="/">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
                  G
                </div>

                <span className="text-xl font-semibold tracking-tight">
                  GearUp
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader> */}

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}