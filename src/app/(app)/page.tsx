import { DataList } from "@/components/data-display/data-list";
import { generateTasks } from "@/lib/data";
import { columns } from "./components/columns";

export default async function ServerPage() {
	const { tasks } = generateTasks(10);

	return (
		<main>
			<section className="py-12">
				<DataList columns={columns} data={tasks} />
			</section>
		</main>
	);
}
