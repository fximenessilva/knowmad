import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Loading from "./Loading";

describe("Loading", () => {
  it("should render the Loading component", () => {
    const { getByTestId } = render(<Loading />);
    const loadingElement = getByTestId("loading");
    expect(loadingElement).toBeInTheDocument();
  });

  it("should have the correct CSS class", () => {
    const { getByTestId } = render(<Loading />);
    const loadingElement = getByTestId("loading");
    expect(loadingElement).toHaveClass("loader");
  });
});
