import { render } from "@testing-library/react";
import { Loader } from "features/loader/Loader";

describe("<Loader />", () => {
  it("renders loading spinner", () => {
    const { container } = render(<Loader />);
    const loadingContainer = container.querySelector(".loadingContainer");
    const loadingSpinner = container.querySelector(".loadingSpinner");

    expect(loadingContainer).toBeInTheDocument();
    expect(loadingSpinner).toBeInTheDocument();

    expect(loadingContainer).toHaveClass("loadingContainer");
    expect(loadingSpinner).toHaveClass("loadingSpinner");
  });
});
