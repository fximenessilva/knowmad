import React from "react";

import styles from "./listCard.module.scss";

const ListCard = ({ title, author, imgSrc }) => {
  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <img className={styles.img} src={imgSrc} />
        <div className={styles["title-wrapper"]}>
          <span className={styles.title}>{title}</span>
          <span className={styles.author}>{author}</span>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
