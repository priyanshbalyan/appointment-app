import { render } from "@testing-library/react";
import { Card } from "./Card";
import { type Slot } from "common/types";

describe("<Card />", () => {
	it("renders correctly", () => {
		const slot = {
			doctor: {
				name: "Dr. Smith",
				specialisation: "Cardiologist",
			},
			time: "2023-10-10T03:00:00.000Z",
		} as unknown as Slot;

		const { getByText } = render(<Card slot={slot} />);

		const doctorNameElement = getByText("Dr. Smith");
		expect(doctorNameElement).toBeInTheDocument();

		const formattedTimeElement = getByText("10:00 AM");
		expect(formattedTimeElement).toBeInTheDocument();

		const specialisationElement = getByText("Cardiologist");
		expect(specialisationElement).toBeInTheDocument();
	});
});
