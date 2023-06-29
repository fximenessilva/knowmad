import React from "react";

import ListProvider from "../../../contexts/ListContext";
import PodcastList from "./PodcastList";

const ListWrapper = () => {
  return (
    <ListProvider>
      <PodcastList />
    </ListProvider>
  );
};

export default ListWrapper;
