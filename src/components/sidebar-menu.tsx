"use client";

import Link from "next/link";
import { SidebarGroup, SidebarMenuItem } from "./ui/sidebar";
import { FileText, LayoutDashboard, Settings, Users2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarContent = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    name: "Posts",
    icon: FileText,
    url: "/posts",
  },
  {
    name: "Users",
    icon: Users2,
    url: "/users",
  },
  {
    name: "Settings",
    icon: Settings,
    url: "/settings",
  },
];

export const SidebarMenu = () => {
  const pathname = usePathname();

  return (
    <>
      <SidebarGroup className="space-y-4 flex-1">
        {sidebarContent.map((sidebar) => (
          <SidebarMenuItem
            key={sidebar.name}
            className={cn(
              "shadow-md bg-white hover:bg-brand-blue/90 hover:text-white transition-all duration-300 rounded-md",
              pathname === sidebar.url && "bg-brand-blue text-white"
            )}
          >
            <Link
              href={sidebar.url}
              className="w-full flex gap-2 items-center justify-content px-2 py-4"
            >
              <sidebar.icon className=" w-6 h-6" />
              <span>{sidebar.name}</span>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarGroup>
    </>
  );
};
