import type { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
	// biome-ignore lint/correctness/noUnusedVariables: TData is used in the TableMeta interface
	interface TableMeta<TData extends RowData> {
		queryKeys?: QueryKeys;
	}

	// biome-ignore lint/correctness/noUnusedVariables: TData and TValue are used in the ColumnMeta interface
	interface ColumnMeta<TData extends RowData, TValue> {
		label?: string;
		placeholder?: string;
		variant?: FilterVariant;
		options?: Option[];
		range?: [number, number];
		unit?: string;
		icon?: React.ReactNode;
	}
}

interface Option {
	value: string;
	label: string;
	icon?: React.ReactNode;
}
