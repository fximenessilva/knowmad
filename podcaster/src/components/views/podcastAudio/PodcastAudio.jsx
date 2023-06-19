import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import DetailCard from "../../common/card/DetailCard";
import AudioPlayer from "../../common/audioPlayer/AudioPlayer";
import NoData from "../../common/noData/NoData";
import { useAppContext } from "../../../contexts/AppContext";
import { useAudioContext } from "../../../contexts/AudioContext";

const PodcastAudio = () => {
  const { podcastId } = useParams();

  const { loading } = useAppContext();

  const { state } = useAudioContext();

  const { audio, error } = state;

  const detail = JSON.parse(localStorage.getItem("podcasts_details"))[podcastId]
    .data;

  const cardProps = {
    author: detail?.[0]?.collectionCensoredName,
    title: detail?.[0]?.trackCensoredName,
    description: detail?.[1]?.shortDescription || detail?.[1]?.description,
    imgSrc: detail?.[0]?.artworkUrl100,
    podcastId,
  };

  const playerProps = {
    title: audio?.trackName,
    audioSrc: audio?.previewUrl,
    description: audio?.description,
  };

  if (!!error && !loading) return <NoData />;

  if (!loading)
    return (
      <main className="detail-wrapper">
        <div className="card-wrapper">
          <DetailCard {...cardProps} />
        </div>
        <div className="episodes">
          <div className="episodes-wrapper box-card">
            <AudioPlayer {...playerProps} />
          </div>
        </div>
      </main>
    );
};

export default PodcastAudio;
