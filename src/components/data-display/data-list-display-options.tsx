"use client";

import type { Table } from "@tanstack/react-table";
import {
	ArrowDownWideNarrowIcon,
	ArrowUpDownIcon,
	ArrowUpWideNarrowIcon,
	LayoutListIcon,
	Settings2Icon,
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function DataDisplayOptions<TData>({
	display,
}: React.ComponentProps<typeof Popover> & { display: Table<TData> }) {
	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button size={"sm"} variant={"outline"}>
						<Settings2Icon /> Display
					</Button>
				}
			/>
			<PopoverContent align="end" className={"space-y-4 p-4"}>
				<div className="grid gap-4">
					<div className="grid grid-cols-2 gap-2">
						<Label htmlFor="group-by">
							<LayoutListIcon className="size-3.5" />
							Group by
						</Label>
						<DataDisplayGroupingOptions
							className="w-full"
							display={display}
							id="group-by"
							size="sm"
						/>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<Label htmlFor="sort-by">
							<ArrowUpDownIcon className="size-3.5" />
							Sort by
						</Label>
						<DataDisplaySortingOptions
							className="w-full"
							display={display}
							id="sort-by"
						/>
					</div>
				</div>
				<div>
					<Label htmlFor="column-visibility">Display Properties</Label>
					<DataDisplayColumnVisibilityOptions
						className="mt-2"
						display={display}
						id="column-visibility"
					/>
				</div>
			</PopoverContent>
		</Popover>
	);
}

function DataDisplayGroupingOptions<TData>({
	display,
	...props
}: React.ComponentProps<typeof NativeSelect> & {
	display: Table<TData>;
}) {
	const grouping = display.getState().grouping;

	const handleChange = React.useCallback(
		(value: string) => {
			display.setGrouping([value]);
			display.setExpanded(true);
		},
		[display],
	);

	const groupableColumns = React.useMemo(() => {
		return display.getAllColumns().filter((column) => column.getCanGroup());
	}, [display]);

	return (
		<NativeSelect
			onChange={(e) => handleChange(e.target.value)}
			value={grouping[0] ?? ""}
			{...props}
		>
			<NativeSelectOption value="">No Grouping</NativeSelectOption>
			{groupableColumns.map((column) => {
				return (
					<NativeSelectOption key={column.id} value={column.id}>
						{column.columnDef.meta?.label}
					</NativeSelectOption>
				);
			})}
		</NativeSelect>
	);
}

function DataDisplaySortingOptions<TData>({
	id,
	display,
	className,
	...props
}: React.ComponentProps<"div"> & {
	display: Table<TData>;
}) {
	const isSorted = display.getState().sorting.length > 0;
	const sorting = display.getState().sorting;
	const sortableColumns = display
		.getAllColumns()
		.filter((column) => column.getCanSort());
	const sortDirection = sorting[0]?.desc ? "DESC" : "ASC";

	const handleSortChange = (columnId: string) => {
		if (!columnId) {
			display.setSorting([]);
			return;
		}
		display.setSorting([{ id: columnId, desc: false }]);
	};

	const handleSortDirectionChange = () => {
		display.setSorting((prev) => {
			return prev.map((item) => ({
				...item,
				desc: !item.desc,
			}));
		});
	};

	return (
		<div className={cn("flex items-center gap-2", className)} {...props}>
			<NativeSelect
				className="grow"
				id={id}
				onChange={(e) => handleSortChange(e.target.value)}
				size="sm"
				value={sorting[0]?.id ?? ""}
			>
				<NativeSelectOption value="">No Sorting</NativeSelectOption>
				{sortableColumns.map((column) => {
					return (
						<NativeSelectOption key={column.id} value={column.id}>
							{column.columnDef.meta?.label}
						</NativeSelectOption>
					);
				})}
			</NativeSelect>
			{isSorted && (
				<Button
					className={"shrink-0"}
					onClick={handleSortDirectionChange}
					size="icon-sm"
					variant="outline"
				>
					{sortDirection === "DESC" ? (
						<ArrowDownWideNarrowIcon />
					) : (
						<ArrowUpWideNarrowIcon />
					)}
					<span className="sr-only">Sort {sortDirection}</span>
				</Button>
			)}
		</div>
	);
}

function DataDisplayColumnVisibilityOptions<TData>({
	display,
	className,
	...props
}: React.ComponentProps<"div"> & { display: Table<TData> }) {
	const toggleableColumns = display
		.getAllColumns()
		.filter((column) => column.getCanHide());

	const handleToggleColumnVisibility = (columnId: string) => {
		display.getColumn(columnId)?.toggleVisibility();
	};

	return (
		<div className={cn("flex flex-wrap gap-1", className)} {...props}>
			{toggleableColumns.map((column) => (
				<Button
					className={"data-[hidden=true]:opacity-50"}
					data-hidden={!column.getIsVisible()}
					key={column.id}
					onClick={() => handleToggleColumnVisibility(column.id)}
					size="xs"
					variant="outline"
				>
					{column.columnDef.meta?.label}
				</Button>
			))}
		</div>
	);
}
