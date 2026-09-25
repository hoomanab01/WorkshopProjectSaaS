import type { CSSProperties } from "react";
import { AppSidebar } from "@/components/app/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// The app frame: side navigation plus the page. Every signed-in screen goes in this folder.
export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <SidebarProvider style={{ "--sidebar-width": "219px" } as CSSProperties}>
      <AppSidebar />
      <SidebarInset className="h-svh min-w-0 overflow-hidden">{children}</SidebarInset>
    </SidebarProvider>
  );
}
