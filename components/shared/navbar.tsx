"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link";
import { toast } from "sonner";

import { logout } from "@/service/logout";
import { NavbarProps } from "@/lib/types";

const navItems = [
  {
    label: "Home",
    action: "home",
  },
  {
    label: "Explore Gear",
    action: "gear",
  },
  // {
  //   label: "Categories",
  //   action: "categories",
  // },
  {
    label: "About",
    action: "about",
  },
  {
    label: "Contact",
    action: "contact",
  },
]

const userMenuItems = [
  {
    label: "Dashboard",
    action: "dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Profile",
    action: "profile",
    icon: User,
  },
  // {
  //   label: "Settings",
  //   action: "settings",
  //   icon: Settings,
  // },
]

export function Navbar({ user }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const router = useRouter()

  const handleNavAction = (action: string) => {
    switch (action) {
      case "home":
        router.push("/")
        break

      case "gear":
        router.push("/gear")
        break

      case "categories":
        router.push("/categories")
        break

      case "about":
        router.push("/about")
        break

      case "contact":
        router.push("/contact")
        break

      default:
        break
    }
  }

  const handleUserMenuAction = async (action: string) => {
  switch (action) {
    case "dashboard":
      switch (user.data.profile.role) {
        case "CUSTOMER":
          router.push("/dashboard");
          break;

        case "PROVIDER":
          router.push("/provider-dashboard");
          break;

        case "ADMIN":
          router.push("/admin-dashboard");
          break;
      }
      break;

    case "profile":
      router.push("/profile");
      break;

    case "settings":
      router.push("/settings");
      break;

    case "logout":
      await logout();
      toast.success("Logged out successfully");
      router.push("/login");
      break;
  }
};

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      {/* <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4"> */}
      <div className="flex h-16 w-full items-center justify-between px-6">
        {/* Logo */}
        <button
          onClick={() => handleNavAction("home")}
          className="flex cursor-pointer items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
            G
          </div>

          <span className="text-xl font-semibold tracking-tight">
            GearUp
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <button
              key={item.action}
              onClick={() => handleNavAction(item.action)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {
            user.success ? (
          <DropdownMenu>
            <DropdownMenuTrigger 
            className="
                cursor-pointer rounded-full p-1 hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
            "
            >
                <Avatar>
                  <AvatarImage
                    src={user.data.profile.profileImage ?? ""}
                    alt={user.data.profile.name}
                />
                  <AvatarFallback>
                    {user.data.profile.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>  
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">
                    {user.data.profile.name}
                    </span>
                  <span className="text-xs text-muted-foreground">
                    {user.data.profile.email}
                  </span>
                </div>
              </DropdownMenuLabel>
                </DropdownMenuGroup>
              <DropdownMenuSeparator />

              {userMenuItems.map((item) => (
                <DropdownMenuItem
                  key={item.action}
                  className="cursor-pointer"
                  onClick={() => handleUserMenuAction(item.action)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => handleUserMenuAction("logout")}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            ) : <Link href = "/login">
                    <Button className="cursor-pointer">
                        Login
                    </Button>
            </Link>
            }
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav className="border-t px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Button
                key={item.action}
                onClick={() => {
                  handleNavAction(item.action)
                  setMobileOpen(false)
                }}
                className="rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {item.label}
              </Button>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}