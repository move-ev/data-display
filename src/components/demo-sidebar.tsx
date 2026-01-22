import { ModeToggle } from "./theme-toggle";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarMenuSkeleton,
} from "./ui/sidebar";

export function DemoSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarContent>
				<SidebarMenuSkeleton />
			</SidebarContent>
			<SidebarFooter>
				<ModeToggle />
			</SidebarFooter>
		</Sidebar>
	);
}
