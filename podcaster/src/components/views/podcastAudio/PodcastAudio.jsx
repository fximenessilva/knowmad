import React from "react";
import { useParams } from "react-router-dom";

import DetailCard from "../../common/card/DetailCard";
import AudioPlayer from "../../common/audioPlayer/AudioPlayer";
import NoData from "../../common/noData/NoData";
import { useAppContext } from "../../../contexts/AppContext";
import { useAudioContext } from "../../../contexts/AudioContext";
import { getter } from "../../../utils/localStorageHelpers";
import { NAMESPACES } from "../../../utils/constants";

const PodcastAudio = () => {
  const { podcastId } = useParams();

  const { loading } = useAppContext();

  const { state } = useAudioContext();

  const { audio, error } = state;

  const detail = getter(NAMESPACES.detail)[podcastId].data;

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

  if (cardProps.author && playerProps.title && !loading)
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
