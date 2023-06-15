import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Wrapper from "components/utils/Wrapper";
import ListProvider from "contexts/ListContext";
import PodcastDetail from "components/views/podcastDetail/PodcastDetail";
import PodcastAudio from "components/views/podcastAudio/PodcastAudio";
import PodcastList from "components/views/podcastList/PodcastList";

import "styles/app.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ListProvider>
        <PodcastList />
      </ListProvider>
    ),
  },
  {
    path: "podcast/:podcastId",
    element: <PodcastDetail />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Wrapper>
    <RouterProvider router={router} />
  </Wrapper>
);
