import React from "react";
import { render, act } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";

import AppProvider, { useAppContext } from "./AppContext";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

describe("AppProvider", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });
  test("provides the app context values correctly", () => {
    const Component = () => {
      const { loading, setLoading } = useAppContext();

      return (
        <div>
          <span data-testid="loading">{loading.toString()}</span>
          <button onClick={() => setLoading(true)}>Set Loading</button>
        </div>
      );
    };

    useLocation.mockReturnValue({ pathname: "/test" });

    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <AppProvider>
          <Component />
        </AppProvider>
      </MemoryRouter>
    );

    const loadingElement = getByTestId("loading");
    const buttonElement = getByText("Set Loading");

    // Initial value of loading should be false
    expect(loadingElement.textContent).toBe("false");

    // Clicking the button should set loading to true
    act(() => {
      buttonElement.click();
    });

    expect(loadingElement.textContent).toBe("true");
  });
});
