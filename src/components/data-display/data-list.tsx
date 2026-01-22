"use client";

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getGroupedRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { DataDisplayOptions } from "./data-list-display-options";
import { DataListGroupHeader } from "./data-list-group-header";
import { List, ListItem } from "./list";

interface DataListProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataList<TData, TValue>({
	columns,
	data,
}: DataListProps<TData, TValue>) {
	const [grouping, setGrouping] = useState<string[]>(["status"]);
	const [sorting, setSorting] = useState<SortingState>([]);

	const display = useReactTable({
		data,
		columns,
		state: {
			grouping,
			expanded: true,
			sorting,
		},
		onGroupingChange: setGrouping,
		onSortingChange: setSorting,
		groupedColumnMode: false,
		getGroupedRowModel: getGroupedRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<div>
			<div className="mb-6 flex items-center justify-end">
				<DataDisplayOptions display={display} />
			</div>
			<List>
				{display.getRowModel().rows.map((row) => {
					if (row.getIsGrouped()) {
						return <DataListGroupHeader display={display} key={row.id} row={row} />;
					}
					return (
						<ListItem key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<div key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</div>
							))}
						</ListItem>
					);
				})}
			</List>
		</div>
	);
}
