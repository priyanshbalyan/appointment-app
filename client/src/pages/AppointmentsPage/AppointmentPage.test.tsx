import { screen, waitFor } from "@testing-library/react";
import AppointmentsPage from "pages/AppointmentsPage/AppointmentsPage";
import { renderWithProviders } from "utils/test-utils";

jest.mock("react-router-dom", () => ({
	useNavigate: jest.fn(),
}));

describe("<AppointmentsPage />", () => {
	it("renders without errors", () => {
		renderWithProviders(<AppointmentsPage />);
		expect(screen.getByText("Booked Appointments")).toBeInTheDocument();
	});

	it("displays loader when data is loading", () => {
		const { getByTestId } = renderWithProviders(<AppointmentsPage />);
		expect(getByTestId("loader")).toBeInTheDocument();
	});

	it("displays cards when appointments are available", async () => {
		renderWithProviders(<AppointmentsPage />);
		await waitFor(() => {
			expect(screen.getByText("No appointments booked")).toBeInTheDocument();
			expect(screen.getByText("+ Book an appointment")).toBeInTheDocument();
		});
	});
});
