import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import NoData from "./NoData";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

describe("NoData", () => {
  it("should render the NoData component with the default props", () => {
    useLocation.mockReturnValue({ pathname: "/" });

    const defaultMessage = "No data found";
    const defaultLinkContent = "<-- Back to podcasts list";
    const { getByText } = render(
      <MemoryRouter>
        <NoData message={defaultMessage} linkContent={defaultLinkContent} />
      </MemoryRouter>
    );
    const messageElement = getByText(defaultMessage);
    const linkElement = getByText(defaultLinkContent);
    expect(messageElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

  it("should render the NoData component with custom props", () => {
    useLocation.mockReturnValue({ pathname: "/" });

    const customMessage = "Custom message";
    const customLinkContent = "Custom link content";
    const { getByText } = render(
      <MemoryRouter>
        <NoData message={customMessage} linkContent={customLinkContent} />
      </MemoryRouter>
    );
    const messageElement = getByText(customMessage);
    const linkElement = getByText(customLinkContent);
    expect(messageElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
