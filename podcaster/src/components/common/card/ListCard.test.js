import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ListCard from "./ListCard";

describe("ListCard", () => {
  const title = "Sample Title";
  const author = "Sample Author";
  const imgSrc = "sample-image.jpg";

  it("should render the component with the provided props", () => {
    const { getByText, getByRole, getByTestId } = render(
      <ListCard title={title} author={author} imgSrc={imgSrc} />
    );

    const cardElement = getByTestId("list-card");
    const titleElement = getByText(title);
    const authorElement = getByText(author);
    const imgElement = getByRole("img");

    expect(cardElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", imgSrc);
  });
});
