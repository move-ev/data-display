import { faker } from "@faker-js/faker";
import type { Tag, Task, User } from "./types";
import { Priority, TaskStatus } from "./types";

export function generateTasks(
	count: number,
	args?: { userCount?: number; tagCount?: number },
) {
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

	const tasks: Task[] = faker.helpers.multiple(
		() => ({
			id: faker.string.uuid(),
			status: faker.helpers.arrayElement(
				Object.values(TaskStatus) as TaskStatus[],
			),
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
			priority: faker.helpers.arrayElement(Object.values(Priority) as Priority[]),
		}),
		{ count },
	);

	return {
		tags,
		users,
		tasks,
	};
}
