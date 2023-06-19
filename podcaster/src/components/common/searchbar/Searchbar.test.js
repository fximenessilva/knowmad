import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  const value = "Sample value";
  const placeholder = "Sample placeholder";
  const length = 10;
  const onChange = jest.fn();

  it("should render the SearchBar component with the provided props", () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(
      <SearchBar
        value={value}
        placeholder={placeholder}
        length={length}
        onChange={onChange}
        type="text"
      />
    );

    const searchBarElement = getByTestId("searchbar");
    const inputElement = getByPlaceholderText(placeholder);
    const lengthElement = getByText(length.toString());

    expect(searchBarElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(lengthElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("value", value);
  });
});
