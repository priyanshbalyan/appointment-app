import { fireEvent } from "@testing-library/react";
import TimeRange from "features/timerange/TimeRange";
import { renderWithProviders } from "utils/test-utils";

describe("<TimeRange />", () => {
	beforeEach(() => {});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders "No open slots available" when range is empty', () => {
		const { getByText } = renderWithProviders(
			<TimeRange onSelect={() => {}} range={[]} selectedTimes={[]} docId={1} />,
		);

		const noSlotText = getByText("No open slots available for today");
		expect(noSlotText).toBeInTheDocument();
	});

	it("renders time buttons and handles selection", () => {
		const onSelectMock = jest.fn();
		const { getByText } = renderWithProviders(
			<TimeRange
				onSelect={onSelectMock}
				range={[
					{ time: "9:00 AM", value: new Date() },
					{ time: "10:00 AM", value: new Date() },
					{ time: "11:00 AM", value: new Date() },
				]}
				selectedTimes={[]}
				docId={1}
			/>,
		);

		// Ensure time buttons are rendered
		const timeButton1 = getByText("9:00 AM");
		const timeButton2 = getByText("10:00 AM");
		const timeButton3 = getByText("11:00 AM");

		expect(timeButton1).toBeInTheDocument();
		expect(timeButton2).toBeInTheDocument();
		expect(timeButton3).toBeInTheDocument();

		// Click a time button
		fireEvent.click(timeButton2);

		// Ensure the onSelect callback was called
		expect(onSelectMock).toHaveBeenCalledWith(expect.any(Date));
	});
});
