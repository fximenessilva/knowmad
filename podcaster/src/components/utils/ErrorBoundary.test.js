import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ErrorBoundary from "./ErrorBoundary";

describe("ErrorBoundary", () => {
  it("should render the children if there is no error", () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Test</div>
      </ErrorBoundary>
    );

    expect(getByText("Test")).toBeInTheDocument();
  });
});
