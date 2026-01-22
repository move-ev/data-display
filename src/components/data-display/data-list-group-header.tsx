"use client";

import type { Row, Table } from "@tanstack/react-table";
import type React from "react";
import { ListGroupHeader } from "./list";

export function DataListGroupHeader<TData>({
	row,
	countItems = true,
	display,
	...props
}: React.ComponentProps<typeof ListGroupHeader> & {
	display: Table<TData>;
	row: Row<TData>;
	countItems?: boolean;
}) {
	// The grouping information is available on the row via `row.groupingColumnId` if using TanStack Table v8+,
	// but you can generally access the grouped column via the `row.groupByID` or by looking at the row's
	// `groupingColumnId` or the first value in `row.getAllCells()`.

	// To get the id of the column this group header represents:
	const groupedByColumnId = row.groupingColumnId;

	if (!groupedByColumnId) {
		return null;
	}

	const column = display.getColumn(groupedByColumnId);

	const label = column?.columnDef.meta?.options?.find(
		(option) => option.value === row.getValue(groupedByColumnId),
	)?.label;

	const icon = column?.columnDef.meta?.options?.find(
		(option) => option.value === row.getValue(groupedByColumnId),
	)?.icon;

	return (
		<ListGroupHeader {...props}>
			{icon && <>{icon}</>}
			{label ?? "Gruppe"}
		</ListGroupHeader>
	);
}
