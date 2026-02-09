import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";

export function AppLayout() {
    return (
        <SidebarProvider>
            <AppSidebar variant="floating" />
            <main className="w-full">
                <SidebarTrigger />
                <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                    <div className="w-full ">
                        <Outlet />
                    </div>
                </div>
            </main>
        </SidebarProvider>
    );
}
