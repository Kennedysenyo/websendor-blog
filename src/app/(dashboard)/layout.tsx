import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <div className=" relative w-full h-screen flex flex-col overflow-hidden">
        <SidebarTrigger className="absolute top-1" />
        <div className="bg-white px-2 md:px-4 py-2 flex-1 overflow-hidden ">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
