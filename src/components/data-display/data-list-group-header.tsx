"use client";

import type { Row, Table } from "@tanstack/react-table";
import type React from "react";
import { ListActionSlot, ListGroupHeader, ListGroupToggle } from "./list";

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
		<ListGroupHeader data-collapsed={!row.getIsExpanded()} {...props}>
			<ListActionSlot>
				{row.getCanExpand() && (
					<ListGroupToggle
						data-expanded={row.getIsExpanded()}
						onClick={row.getToggleExpandedHandler()}
					/>
				)}
			</ListActionSlot>
			{icon && <span className="text-muted-foreground">{icon}</span>}
			{label ?? "Gruppe"}
		</ListGroupHeader>
	);
}
