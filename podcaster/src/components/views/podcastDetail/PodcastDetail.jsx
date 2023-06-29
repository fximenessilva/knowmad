import React from "react";
import { useParams } from "react-router-dom";

import { useDetailContext } from "../../../contexts/DetailContext";
import { useAppContext } from "../../../contexts/AppContext";
import DetailCard from "../../common/card/DetailCard";
import Table from "../../common/table/Table";
import NoData from "../../common/noData/NoData";
import { formatDate, getTime } from "../../../utils";

const columns = ["title", "date", "duration"];

const PodcastDetail = () => {
  const { podcastId } = useParams();
  const { state } = useDetailContext();
  const { loading } = useAppContext();

  const { podcast, error } = state;

  const cardProps = {
    author: podcast?.[0]?.collectionCensoredName,
    title: podcast?.[0]?.trackCensoredName,
    description: podcast?.[1]?.shortDescription || podcast?.[1]?.description,
    imgSrc: podcast?.[0]?.artworkUrl100,
    podcastId,
  };

  const [firstElement, ...episodes] = podcast;

  const episodesLength = episodes.length;

  const data = episodes.map((el) => ({
    date: formatDate(el.releaseDate) || "",
    title: el.trackName,
    duration: getTime(el.trackTimeMillis) || 0,
    href: `/podcast/${podcastId}/episode/${el.trackId}`,
  }));

  if (!!error && !loading) return <NoData />;

  if (!loading)
    return (
      <main className="detail-wrapper">
        <div className="card-wrapper">
          <DetailCard {...cardProps} />
        </div>
        <div className="episodes">
          <div className="episodes-count box-card">
            Episodes: {episodesLength}
          </div>
          <div className="episodes-wrapper box-card">
            <Table data={data} columns={columns} />
          </div>
        </div>
      </main>
    );
};

export default PodcastDetail;
