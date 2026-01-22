import {
	OctagonAlertIcon,
	SignalHighIcon,
	SignalLowIcon,
	SignalMediumIcon,
	SquircleDashedIcon,
} from "lucide-react";
import type { Priority } from "@/lib/types";

export function PriorityIcon({
	priority,
	...props
}: React.ComponentProps<"svg"> & { priority: Priority }) {
	switch (priority) {
		case "NONE":
			return <SquircleDashedIcon {...props} />;
		case "LOW":
			return <SignalLowIcon {...props} />;
		case "MEDIUM":
			return <SignalMediumIcon {...props} />;
		case "HIGH":
			return <SignalHighIcon {...props} />;
		case "URGENT":
			return <OctagonAlertIcon {...props} />;
	}
}
