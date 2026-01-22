import {
	CircleAlertIcon,
	CircleCheckIcon,
	CircleDashedIcon,
	CircleDotDashedIcon,
	CircleFadingArrowUpIcon,
} from "lucide-react";
import type { TaskStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StatusIcon({
	status,
	className,
	colored = false,
	...props
}: React.ComponentProps<"svg"> & { status: TaskStatus; colored?: boolean }) {
	switch (status) {
		case "TODO":
			return (
				<CircleDotDashedIcon
					className={cn(colored && "text-muted-foreground", className)}
					{...props}
				/>
			);
		case "IN_PROGRESS":
			return (
				<CircleFadingArrowUpIcon
					className={cn(colored && "text-muted-foreground", className)}
					{...props}
				/>
			);
		case "COMPLETED":
			return (
				<CircleCheckIcon
					className={cn(colored && "text-green-500", className)}
					{...props}
				/>
			);
		case "BLOCKED":
			return (
				<CircleDashedIcon
					className={cn(colored && "text-red-500", className)}
					{...props}
				/>
			);
		case "STALE":
			return (
				<CircleAlertIcon
					className={cn(colored && "text-yellow-500", className)}
					{...props}
				/>
			);
		default:
			return (
				<CircleAlertIcon
					className={cn(colored && "text-muted-foreground", className)}
					{...props}
				/>
			);
	}
}
