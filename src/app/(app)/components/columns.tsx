"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarX2Icon, CircleIcon } from "lucide-react";
import { ListActionSlot } from "@/components/data-display/list";
import { PriorityIcon } from "@/components/priority-icon";
import { StatusIcon } from "@/components/status-icon";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { Task } from "@/lib/types";
import { cn, translatePriority, translateStatus } from "@/lib/utils";

const selectColumn: ColumnDef<Task> = {
	id: "select",
	cell: ({ row }) => {
		return (
			<ListActionSlot>
				<Checkbox
					aria-label="Select row"
					checked={row.getIsSelected()}
					className={
						""
						// "border-foreground/40 opacity-0 hover:border-foreground/70 group-hover/list-item:opacity-100 data-checked:opacity-100"
					}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
				/>
			</ListActionSlot>
		);
	},
	enableGrouping: false,
	enableSorting: false,
	enableHiding: false,
	meta: {
		label: "Select",
	},
};

const statusColumn: ColumnDef<Task> = {
	accessorKey: "status",
	enableGrouping: true,
	cell: ({ row }) => {
		return (
			<span>
				<StatusIcon className="size-4" colored status={row.original.status} />
				<span className="sr-only">{translateStatus(row.original.status)}</span>
			</span>
		);
	},
	sortingFn: (rowA, rowB) => {
		const order = ["TODO", "IN_PROGRESS", "COMPLETED", "BLOCKED", "STALE"];
		return (
			order.indexOf(rowA.original.status) - order.indexOf(rowB.original.status)
		);
	},
	meta: {
		label: "Status",
		options: (
			["TODO", "IN_PROGRESS", "COMPLETED", "BLOCKED", "STALE"] as const
		).map((status) => {
			return {
				value: status,
				label: translateStatus(status),
				icon: <StatusIcon status={status} />,
			};
		}),
	},
};

const priorityColumn: ColumnDef<Task> = {
	accessorKey: "priority",
	enableGrouping: true,
	enableSorting: true,
	cell: ({ row }) => {
		return (
			<span>
				<PriorityIcon className="size-4" priority={row.original.priority} />
				<span className="sr-only">{translatePriority(row.original.priority)}</span>
			</span>
		);
	},
	sortingFn: (rowA, rowB) => {
		const order = ["NONE", "LOW", "MEDIUM", "HIGH", "URGENT"];
		return (
			order.indexOf(rowA.original.priority) - order.indexOf(rowB.original.priority)
		);
	},
	meta: {
		label: "Priority",
		options: (["NONE", "LOW", "MEDIUM", "HIGH", "URGENT"] as const).map(
			(priority) => {
				return {
					value: priority,
					label: translatePriority(priority),
					icon: <PriorityIcon priority={priority} />,
				};
			},
		),
	},
};

const idColumn: ColumnDef<Task> = {
	accessorKey: "id",
	cell: ({ row }) => {
		return (
			<div>
				<span className="text-muted-foreground text-sm">{row.original.id}</span>
			</div>
		);
	},
	enableGrouping: false,
	enableSorting: false,
	enableHiding: true,
	meta: {
		label: "ID",
	},
};

const tagsColumn: ColumnDef<Task> = {
	accessorKey: "tags",
	cell: ({ row }) => {
		return (
			<div className="flex gap-1">
				{row.original.tags.map((tag) => (
					<Badge className="gap-1.5" key={tag.value} variant={"outline"}>
						<CircleIcon className={cn(tag.className, "size-2! fill-current")} />
						<span>{tag.label}</span>
					</Badge>
				))}
			</div>
		);
	},
	enableGrouping: true,
	meta: {
		label: "Tags",
	},
};

const deadlineColumn: ColumnDef<Task> = {
	accessorKey: "deadline",
	cell: ({ row }) => {
		return (
			<Badge variant={"outline"}>
				<CalendarX2Icon className="text-red-500" />
				<span>{format(row.original.deadline, "dd.MM.")}</span>
			</Badge>
		);
	},
	enableGrouping: false,
	enableSorting: true,
	enableHiding: true,
	meta: {
		label: "Deadline",
	},
};

export const columns: ColumnDef<Task>[] = [
	selectColumn,
	priorityColumn,
	idColumn,
	statusColumn,
	{
		accessorKey: "title",
		enableGrouping: false,
		cell: ({ row }) => {
			return (
				<span className="text-sm" data-spacer>
					{row.original.title}
				</span>
			);
		},
		meta: {
			label: "Title",
		},
	},
	tagsColumn,
	deadlineColumn,
];
