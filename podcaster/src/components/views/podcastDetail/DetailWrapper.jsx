import React from "react";

import DetailProvider from "../../../contexts/DetailContext";
import PodcastDetail from "./PodcastDetail";

const DetailWrapper = () => {
  return (
    <DetailProvider>
      <PodcastDetail />
    </DetailProvider>
  );
};

export default DetailWrapper;
