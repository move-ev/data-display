import { DemoSidebar } from "@/components/demo-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function ServerLayout({ children }: LayoutProps<"/">) {
    return <SidebarProvider>
        <DemoSidebar variant="inset"/>

        <SidebarInset>
{children}
        </SidebarInset>
    </SidebarProvider>
}
