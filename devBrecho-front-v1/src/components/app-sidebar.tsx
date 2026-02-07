import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar({
    variant,
}: {
    variant?: "floating" | "sidebar" | "inset" | undefined;
}) {
    return (
        <Sidebar variant={variant}>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarMenuItem>Dashboard</SidebarMenuItem>
                <SidebarMenuItem>
                    Cuzinho preto do ativão alfa preto negão roludo
                </SidebarMenuItem>

                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
