import { screen } from "@testing-library/react";
import BookingPage from "pages/BookingPage/BookingPage";
import { renderWithProviders } from "utils/test-utils";

// Mock the necessary dependencies
jest.mock("app/hooks", () => ({
	useAppDispatch: jest.fn(),
	useAppSelector: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
	useNavigate: jest.fn(),
}));

describe("<BookingPage />", () => {
	it("renders without errors", () => {
		renderWithProviders(<BookingPage />);
		expect(screen.getByText("Booking Appointment")).toBeInTheDocument();
	});
});
