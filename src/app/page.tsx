import { generateTasks } from "@/lib/data";

export default async function ServerPage() {
	const { tasks, users, tags } = generateTasks(100);

	return (
		<main>
			<section className="py-12"></section>
		</main>
	);
}
