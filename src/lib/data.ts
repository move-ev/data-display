import { faker } from "@faker-js/faker";
import type { Priority, Tag, Task, TaskStatus, User } from "./types";

export function generateTasks(
	count: number,
	args?: { userCount?: number; tagCount?: number },
) {
	const projects = ["TES", "KLE", "RIO", "DEV"];

	const { userCount = 10, tagCount = 10 } = args ?? {};

	const users: User[] = faker.helpers.multiple(
		() => ({
			id: faker.string.uuid(),
			name: faker.person.fullName(),
			email: faker.internet.email(),
		}),
		{ count: userCount },
	);

	const tags: Tag[] = faker.helpers.multiple(
		() => ({
			value: faker.string.uuid(),
			label: faker.lorem.word(),
		}),
		{ count: tagCount },
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
			tags: faker.helpers.multiple(
				() => ({
					value: faker.string.uuid(),
					label: faker.lorem.word(),
				}),
				{ count: faker.number.int({ min: 1, max: 3 }) },
			),
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
