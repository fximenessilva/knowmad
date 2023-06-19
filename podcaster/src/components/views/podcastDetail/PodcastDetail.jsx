import React from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import { useDetailContext } from "../../../contexts/DetailContext";
import { useAppContext } from "../../../contexts/AppContext";
import DetailCard from "../../common/card/DetailCard";
import Table from "../../common/table/Table";

const getTime = (milli) => milli && new Date(milli).toISOString().slice(11, 19);

const formatDate = (date) => moment(date).format("DD/MM/YYYY");

const columns = ["title", "date", "duration"];

const PodcastDetail = () => {
  const { podcastId } = useParams();
  const { state } = useDetailContext();
  const { loading } = useAppContext();

  const detail = state.podcast;

  const cardProps = {
    author: detail?.[0]?.collectionCensoredName,
    title: detail?.[0]?.trackCensoredName,
    description: detail?.[1]?.shortDescription || detail?.[1]?.description,
    imgSrc: detail?.[0]?.artworkUrl100,
    podcastId,
  };

  const [firstElement, ...episodes] = detail;

  const episodesLength = episodes.length;

  const data = episodes.map((el) => ({
    date: formatDate(el.releaseDate) || "",
    title: el.trackName,
    duration: getTime(el.trackTimeMillis) || 0,
    href: `/podcast/${podcastId}/episode/${el.trackId}`,
  }));

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
