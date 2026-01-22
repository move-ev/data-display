import { Sidebar, SidebarContent, SidebarMenuSkeleton } from "./ui/sidebar";

export function DemoSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarContent>
				<SidebarMenuSkeleton />
			</SidebarContent>
		</Sidebar>
	);
}
