"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { PriorityIcon } from "@/components/priority-icon";
import { StatusIcon } from "@/components/status-icon";
import type { Task } from "@/lib/types";
import { translatePriority, translateStatus } from "@/lib/utils";

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
	enableSorting: false,
	cell: ({ row }) => {
		return (
			<span>
				<PriorityIcon className="size-4" priority={row.original.priority} />
				<span className="sr-only">{translatePriority(row.original.priority)}</span>
			</span>
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
export const columns: ColumnDef<Task>[] = [
	statusColumn,
	priorityColumn,
	{
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
	},
	{
		accessorKey: "title",
		enableGrouping: false,
		meta: {
			label: "Title",
		},
	},
];
