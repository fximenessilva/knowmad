import React from "react";

import styles from "./podcastCard.module.scss";

const PodcastCard = ({ title, author, imgSrc }) => {
  return (
    <div className={styles.card}>
      <img className={styles.img} src={imgSrc} />
      <div className={styles["title-wrapper"]}>
        <span className={styles.title}>{title}</span>
        <span className={styles.author}>{author}</span>
      </div>
    </div>
  );
};

export default PodcastCard;
