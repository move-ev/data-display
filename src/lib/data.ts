import { faker } from "@faker-js/faker";
import type { Priority, Tag, Task, TaskStatus, User } from "./types";

const tags: Tag[] = [
	{
		value: "feature",
		label: "Feature",
		className: "text-blue-500",
	},
	{
		value: "bug",
		label: "Bug",
		className: "text-red-500",
	},
	{
		value: "documentation",
		label: "Documentation",
		className: "text-green-500",
	},
	{
		value: "refactoring",
		label: "Refactoring",
		className: "text-yellow-500",
	},
	{
		value: "maintenance",
		label: "Maintenance",
		className: "text-gray-500",
	},
	{
		value: "testing",
		label: "Testing",
		className: "text-purple-500",
	},
	{
		value: "performance",
		label: "Performance",
		className: "text-pink-500",
	},
	{
		value: "security",
		label: "Security",
		className: "text-orange-500",
	},
];

export function generateTasks(count: number, args?: { userCount?: number }) {
	const projects = ["TES", "KLE", "RIO", "DEV"];

	const { userCount = 10 } = args ?? {};

	const users: User[] = faker.helpers.multiple(
		() => ({
			id: faker.string.uuid(),
			name: faker.person.fullName(),
			email: faker.internet.email(),
		}),
		{ count: userCount },
	);

	let i = 0;
	const tasks: Task[] = [];
	while (tasks.length < count) {
		const project = faker.helpers.arrayElement(projects);
		const id = `${project}-${i}`;
		i++;
		tasks.push({
			id,
			title: faker.lorem.sentence({ min: 2, max: 5 }),
			status: faker.helpers.arrayElement([
				"TODO",
				"IN_PROGRESS",
				"COMPLETED",
				"BLOCKED",
				"STALE",
			] as unknown as TaskStatus[]),
			assignee: faker.datatype.boolean()
				? faker.helpers.arrayElement(users)
				: null,
			deadline: faker.date.future(),
			createdAt: faker.date.past(),
			lastUpdatedAt: faker.date.recent(),
			tags: faker.helpers.arrayElements(tags, { min: 1, max: 3 }),
			priority: faker.helpers.arrayElement([
				"NONE",
				"LOW",
				"MEDIUM",
				"HIGH",
				"URGENT",
			] as Priority[]),
		});
	}

	return {
		tags,
		users,
		tasks,
	};
}
