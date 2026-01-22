import type React from "react";
import { cn } from "@/lib/utils";

export function List({ className, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul
			className={cn(
				"group/list",
				"[--list-px:1rem] [--list-py:0.75rem]",
				className,
			)}
			data-slot="list"
			{...props}
		/>
	);
}

export function ListGroupHeader({
	className,
	...props
}: React.ComponentProps<"li">) {
	return (
		<li
			className={cn(
				"flex items-center justify-start gap-2 border-y bg-muted px-(--list-px) py-2 font-medium text-foreground text-sm [&_svg]:size-4",
				className,
			)}
			data-slot=""
			{...props}
		/>
	);
}

export function ListItem({ className, ...props }: React.ComponentProps<"li">) {
	return (
		<li
			className={cn(
				"flex items-center justify-start gap-2 px-(--list-px) py-(--list-py) text-sm",
				className,
			)}
			data-slot=""
			{...props}
		/>
	);
}
