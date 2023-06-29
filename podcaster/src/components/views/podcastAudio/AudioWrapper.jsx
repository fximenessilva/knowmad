import React from "react";

import AudioProvider from "../../../contexts/AudioContext";
import PodcastAudio from "./PodcastAudio";

const AudioWrapper = () => {
  return (
    <AudioProvider>
      <PodcastAudio />
    </AudioProvider>
  );
};

export default AudioWrapper;
