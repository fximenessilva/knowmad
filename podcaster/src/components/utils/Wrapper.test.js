import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import Wrapper from "./Wrapper";

describe("Wrapper", () => {
  it("should render the Header component", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Wrapper />
      </MemoryRouter>
    );
    const headerElement = getByTestId("header");
    expect(headerElement).toBeInTheDocument();
  });
});
