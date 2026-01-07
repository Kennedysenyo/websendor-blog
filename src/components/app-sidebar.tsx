import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FileText, LayoutDashboard, Settings, Users2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LogOutButton from "./logout-button";

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

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="flex flex-col">
        <div className="w-full h-[80px] relative flex justify-center items-center rounded-md shadow-md mb-4">
          <div className=" rounded-md relative w-[40px] h-[40px]">
            <Image src="/logo.png" alt="websendor logo" fill />
          </div>
          <span className="text-xl lg:text-2xl text-brand-blue font-bold ml-2">
            Websendor
          </span>
        </div>
        <SidebarGroup className="space-y-4 flex-1">
          {sidebarContent.map((sidebar) => (
            <SidebarMenuItem
              key={sidebar.name}
              className="shadow-md hover:bg-brand-blue/90 hover:text-white transition-all duration-300 rounded-md"
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

        <SidebarFooter>
          <LogOutButton />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
