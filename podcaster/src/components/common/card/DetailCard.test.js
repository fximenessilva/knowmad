import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect"; // Import the necessary functions from jest-dom
import DetailCard from "./DetailCard";

describe("DetailCard", () => {
  const title = "Sample Title";
  const author = "Sample Author";
  const imgSrc = "sample-image.jpg";
  const description = "Sample Description";
  const podcastId = "sample-podcast-id";

  it("should render the component with the provided props", () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <DetailCard
          title={title}
          author={author}
          imgSrc={imgSrc}
          description={description}
          podcastId={podcastId}
        />
      </MemoryRouter>
    );

    const titleElement = getByText(title);
    const authorElement = getByText(`by ${author}`);
    const imgElement = getByRole("img");
    const descriptionElement = getByText(description);

    expect(titleElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", imgSrc);
    expect(descriptionElement).toBeInTheDocument();
  });

  it("should render the correct link to podcast details", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <DetailCard
          title={title}
          author={author}
          imgSrc={imgSrc}
          description={description}
          podcastId={podcastId}
        />
      </MemoryRouter>
    );

    const linkElement = getByRole("link");

    expect(linkElement).toHaveAttribute("href", `/podcast/${podcastId}`);
  });
});
