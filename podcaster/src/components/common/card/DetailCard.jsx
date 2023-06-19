import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./detailCard.module.scss";

const DetailCard = ({ title, author, imgSrc, description, podcastId }) => {
  return (
    <div className={`${styles.card} box-card`} data-testid="detail-card">
      <Link to={`/podcast/${podcastId}`}>
        <div className={styles["img-wrapper"]}>
          <img className={styles.img} src={imgSrc} data-testid="card-img" />
        </div>
        <span className={styles.hr} />
        <div className={styles["title-wrapper"]}>
          <span className={styles.title}>{title}</span>
          <span className={styles.author}>by {author}</span>
        </div>
      </Link>
      <span className={styles.hr} />
      <div className={styles["desc-wrapper"]}>
        <span>Description:</span>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

DetailCard.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  imgSrc: PropTypes.string,
  description: PropTypes.string,
  podcastId: PropTypes.string.isRequired,
};

export default DetailCard;
