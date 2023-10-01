import { screen, fireEvent } from "@testing-library/react";
import SignUpPage from "pages/SignUpPage/SignUpPage";
import { renderWithProviders } from "utils/test-utils";

jest.mock("react-router-dom", () => ({
	useNavigate: jest.fn(),
}));

describe("<SignUpPage />", () => {
	it("renders the SignUpPage component", () => {
		renderWithProviders(<SignUpPage />);
		expect(screen.getByText("Sign Up")).toBeInTheDocument();
	});

	it("handles email and password input changes", () => {
		renderWithProviders(<SignUpPage />);
		const emailInput =
			screen.getByPlaceholderText<HTMLInputElement>("Your email address");
		const passwordInput = screen.getByTestId<HTMLInputElement>("password");

		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password123" } });

		expect(emailInput.value).toBe("test@example.com");
		expect(passwordInput.value).toBe("password123");
	});

	it("handles checkbox change", () => {
		renderWithProviders(<SignUpPage />);
		const checkbox = screen.getByTestId("checkbox");

		fireEvent.click(checkbox);

		expect(checkbox).toBeChecked();
	});
});
