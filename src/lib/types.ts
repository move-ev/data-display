export type TaskStatus =
	| "TODO"
	| "IN_PROGRESS"
	| "COMPLETED"
	| "BLOCKED"
	| "STALE";

export type Priority = "NONE" | "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface User {
	id: string;
	name: string;
	email: string;
}

export interface Tag {
	value: string;
	label: string;
}

export interface Task {
	id: string;
	title: string;
	status: TaskStatus;
	assignee: User | null;
	deadline: Date;
	createdAt: Date;
	lastUpdatedAt: Date;
	tags: Tag[];
	priority: Priority;
}
