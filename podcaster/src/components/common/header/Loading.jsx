import React from "react";

import styles from "./loading.module.scss";

const Loading = () => {
  return <span data-testid="loading" className={styles.loader} />;
};

export default Loading;
