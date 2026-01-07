import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";

import Image from "next/image";

import LogOutButton from "./logout-button";
import { SidebarMenu } from "./sidebar-menu";

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
        <SidebarMenu />
        <SidebarFooter>
          <LogOutButton />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
