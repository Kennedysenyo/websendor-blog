"use client";

import Link from "next/link";
import { SidebarGroup, SidebarMenuItem } from "./ui/sidebar";
import {
  FileText,
  LayoutDashboard,
  LayoutGrid,
  ListPlus,
  LucideProps,
  Settings,
  Users2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";

interface SubRoutes {
  name: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  url: string;
}

interface SidebarNavType {
  name: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  url?: string;
  subRoutes?: SubRoutes[];
}

const sidebarContent: SidebarNavType[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    name: "Posts",
    icon: FileText,
    subRoutes: [
      {
        name: "All Posts",
        icon: LayoutGrid,
        url: "/posts",
      },
      {
        name: "Categories",
        icon: ListPlus,
        url: "/posts/categories",
      },
    ],
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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <SidebarGroup className="space-y-4 flex-1">
        {sidebarContent.map((sidebar) =>
          sidebar.subRoutes ? (
            <SidebarMenuItem
              key={sidebar.name}
              className=" cursor-pointer bg-white  "
            >
              <span
                onClick={() => {
                  setIsOpen((prev) => !prev);
                }}
                className="w-full group/menu-item flex gap-2 shadow-md items-center justify-content px-2 py-4 hover:bg-brand-blue/90 hover:text-white transition-all duration-300 rounded-md"
              >
                <sidebar.icon className=" w-6 h-6" />
                <span>{sidebar.name}</span>
              </span>

              <div
                className={cn(
                  "flex flex-col space-y-2 bg-sidebar border border-gray-100 overflow-hidden transition-all duration-300",
                  isOpen ? "h-auto p-2 pl-4" : "h-0 min-h-0 p-0"
                )}
              >
                {sidebar.subRoutes.map((nav) => (
                  <Link
                    key={nav.name}
                    className={cn(
                      "flex items-center gap-2 text-sm bg-sidebar border border-gray-100 bg-white hover:text-white hover:bg-brand-blue/80 p-1 rounded-sm",
                      pathname === nav.url && "bg-brand-blue/90 text-white"
                    )}
                    href={nav.url}
                  >
                    {<nav.icon className="size-5" />}
                    {nav.name}
                  </Link>
                ))}
              </div>
            </SidebarMenuItem>
          ) : (
            <SidebarMenuItem
              key={sidebar.name}
              className={cn(
                "shadow-md bg-white hover:bg-brand-blue/90 hover:text-white transition-all duration-300 rounded-md",
                pathname === sidebar.url && "bg-brand-blue text-white"
              )}
            >
              <Link
                href={sidebar.url!}
                className="w-full flex gap-2 items-center justify-content px-2 py-4"
              >
                <sidebar.icon className=" w-6 h-6" />
                <span>{sidebar.name}</span>
              </Link>
            </SidebarMenuItem>
          )
        )}
      </SidebarGroup>
    </>
  );
};
