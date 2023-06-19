import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import Header from "./Header";

describe("Header", () => {
  it("should render the component with the correct link", () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const headerElement = getByTestId("header");
    const linkElement = getByText("Podcaster");

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
