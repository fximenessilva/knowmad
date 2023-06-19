import React from "react";
import { Link } from "react-router-dom";

import styles from "./detailCard.module.scss";

const DetailCard = ({ title, author, imgSrc, description, podcastId }) => {
  return (
    <div className={`${styles.card} box-card`}>
      <Link to={`/podcast/${podcastId}`}>
        <div className={styles["img-wrapper"]}>
          <img className={styles.img} src={imgSrc} />
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

export default DetailCard;
