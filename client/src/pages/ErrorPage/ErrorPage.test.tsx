import React from "react";
import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import { Endpoints } from "features/router/endpoints";

describe("<ErrorPage />", () => {
	it("renders the ErrorPage component", () => {
		render(
			<MemoryRouter>
				<ErrorPage />
			</MemoryRouter>,
		);

		expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
		expect(screen.getByText("Go back to home")).toBeInTheDocument();
	});

	it('navigates to the SIGN_IN page when the "Go back to home" button is clicked', () => {
		const { container } = render(
			<MemoryRouter initialEntries={[Endpoints.SIGN_IN]}>
				<ErrorPage />
			</MemoryRouter>,
		);

		const goBackButton = screen.getByText("Go back to home");
		act(() => {
			goBackButton.click();
		});

		expect(container.innerHTML).toMatch(Endpoints.SIGN_IN);
	});
});
