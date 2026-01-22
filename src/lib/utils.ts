import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Priority, TaskStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function translatePriority(priority: Priority) {
	switch (priority) {
		case "NONE":
			return "None";
		case "LOW":
			return "Low";
		case "MEDIUM":
			return "Medium";
		case "HIGH":
			return "High";
		case "URGENT":
			return "Urgent";
	}
}

export function translateStatus(status: TaskStatus) {
	switch (status) {
		case "TODO":
			return "ToDo";
		case "IN_PROGRESS":
			return "In Progress";
		case "COMPLETED":
			return "Completed";
		case "BLOCKED":
			return "Blocked";
		case "STALE":
			return "Stale";
		default:
			return "Unknown";
	}
}
