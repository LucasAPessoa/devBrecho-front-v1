import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";

export function AppLayout() {
    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebar variant="floating" />
            <main className="w-full">
                <SidebarTrigger />
                <div className="w-full min-h-svh p-4 md:p-6 lg:p-8">
                    <div className="w-full max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </SidebarProvider>
    );
}
