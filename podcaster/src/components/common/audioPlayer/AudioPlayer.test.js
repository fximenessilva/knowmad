import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AudioPlayer from "./AudioPlayer";

describe("AudioPlayer", () => {
  const title = "Sample Title";
  const description = "Sample Description";
  const audioSrc = "sample-audio.mp3";
  it("should render the component with the provided props", async () => {
    const { getByTestId } = render(
      <AudioPlayer
        title={title}
        description={description}
        audioSrc={audioSrc}
      />
    );

    const audioComponent = getByTestId("audio-player");
    expect(audioComponent).toBeDefined();
  });

  it("should display the title correctly", async () => {
    const { getByText } = render(
      <AudioPlayer
        title={title}
        description={description}
        audioSrc={audioSrc}
      />
    );

    const titleElement = getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it("should display the description correctly", async () => {
    const { getByTestId } = render(
      <AudioPlayer
        title={title}
        description={description}
        audioSrc={audioSrc}
      />
    );

    const descriptionElement = getByTestId("description");
    expect(descriptionElement).toHaveTextContent(description);
  });

  it("should set the audio source correctly", async () => {
    const { getByTestId } = render(
      <AudioPlayer
        title={title}
        description={description}
        audioSrc={audioSrc}
      />
    );

    const audioElement = getByTestId("audio");
    expect(audioElement).toHaveAttribute("src", audioSrc);
  });
});
