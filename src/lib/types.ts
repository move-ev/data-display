export enum TaskStatus {
	TODO,
	IN_PROGRESS,
	COMPLETED,
	BLOCKED,
	STALE,
}

export interface User {
	id: string;
	name: string;
	email: string;
}

export interface Tag {
	value: string;
	label: string;
}

export enum Priority {
	NONE,
	LOW,
	MEDIUM,
	HIGH,
	URGENT,
}

export interface Task {
	id: string;
	status: TaskStatus;
	assignee: User | null;
	deadline: Date;
	createdAt: Date;
	lastUpdatedAt: Date;
	tags: Tag[];
	priority: Priority;
}
