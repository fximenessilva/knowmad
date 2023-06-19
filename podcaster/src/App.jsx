import * as React from "react";
import { Route, Routes } from "react-router-dom";

import Wrapper from "./components/utils/Wrapper";
import ListProvider from "./contexts/ListContext";
import DetailProvider from "./contexts/DetailContext";
import AudioProvider from "./contexts/AudioContext";
import PodcastDetail from "./components/views/podcastDetail/PodcastDetail";
import PodcastAudio from "./components/views/podcastAudio/PodcastAudio";
import PodcastList from "./components/views/podcastList/PodcastList";

import "styles/app.scss";

function App() {
  return (
    <Wrapper>
      <Routes>
        <Route
          path="/"
          element={
            <ListProvider>
              <PodcastList />
            </ListProvider>
          }
        />
        <Route
          path="/podcast/:podcastId"
          element={
            <DetailProvider>
              <PodcastDetail />
            </DetailProvider>
          }
        />
        <Route
          path="/podcast/:podcastId/episode/:episodeId"
          element={
            <AudioProvider>
              <PodcastAudio />
            </AudioProvider>
          }
        />
      </Routes>
    </Wrapper>
  );
}

export default App;
