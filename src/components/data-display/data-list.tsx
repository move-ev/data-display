"use client";

import {
	type ColumnDef,
	type ExpandedState,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getGroupedRowModel,
	getSortedRowModel,
	type RowSelectionState,
	type SortingState,
	useReactTable,
	type VisibilityState,
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
	const [layout, setLayout] = useState<"compact" | "default" | "loose">(
		"default",
	);
	const [grouping, setGrouping] = useState<string[]>([]);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [expanded, setExpanded] = useState<ExpandedState>(true);

	const display = useReactTable({
		autoResetExpanded: false,
		enableExpanding: true,
		data,
		columns,
		state: {
			grouping,
			expanded,
			sorting,
			rowSelection,
			columnVisibility,
		},
		onExpandedChange: setExpanded,
		onRowSelectionChange: setRowSelection,
		onGroupingChange: setGrouping,
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		groupedColumnMode: false,
		getGroupedRowModel: getGroupedRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<div>
			<div className="flex items-center justify-end px-4 py-4">
				<DataDisplayOptions
					display={display}
					layout={layout}
					onLayoutChange={setLayout}
				/>
			</div>
			<List layout={layout}>
				{display.getRowModel().rows.map((row) => {
					if (row.getIsGrouped()) {
						return <DataListGroupHeader display={display} key={row.id} row={row} />;
					}
					return (
						<ListItem
							{...(row.getIsSelected() ? { "data-selected": true } : {})}
							key={row.id}
						>
							{row.getVisibleCells().map((cell) => (
								<div className="has-data-spacer:grow" key={cell.id}>
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
