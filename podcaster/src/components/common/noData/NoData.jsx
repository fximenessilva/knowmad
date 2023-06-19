import React from "react";
import { Link } from "react-router-dom";

import styles from "./noData.module.scss";

const NoData = ({
  message = "No data found",
  linkContent = "<-- Back to podcasts list",
}) => {
  return (
    <div className={`${styles.wrapper} box-card`}>
      <div className={styles.inner}>
        <p className={styles.txt}>{message}</p>

        <Link to="/">{linkContent}</Link>
      </div>
    </div>
  );
};

export default NoData;
