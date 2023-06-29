import * as React from "react";
import { Route, Routes } from "react-router-dom";

import AudioWrapper from "./components/views/podcastAudio/AudioWrapper";
import DetailWrapper from "./components/views/podcastDetail/DetailWrapper";
import ListWrapper from "./components/views/podcastList/ListWrapper";

import "styles/app.scss";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ListWrapper />} />
      <Route path="/podcast/:podcastId" element={<DetailWrapper />} />
      <Route
        path="/podcast/:podcastId/episode/:episodeId"
        element={<AudioWrapper />}
      />
    </Routes>
  );
}

export default AppRoutes;
