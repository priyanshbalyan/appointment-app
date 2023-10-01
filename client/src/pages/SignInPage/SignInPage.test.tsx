import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignInPage from "pages/SignInPage/SignInPage";
import { renderWithProviders } from "utils/test-utils";

describe("<SignInPage />", () => {
	it("renders the SignInPage component", () => {
		renderWithProviders(
			<MemoryRouter>
				<SignInPage />
			</MemoryRouter>,
		);

		expect(screen.queryAllByText("Sign In")).toHaveLength(2);
		expect(
			screen.queryAllByText("Hi there! Nice to see you again"),
		).toHaveLength(1);
	});
});
