import React from "react";
import PropTypes from "prop-types";

import styles from "./listCard.module.scss";

const ListCard = ({ title, author, imgSrc }) => {
  return (
    <div className={styles.card} data-testid="list-card">
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

ListCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default ListCard;
