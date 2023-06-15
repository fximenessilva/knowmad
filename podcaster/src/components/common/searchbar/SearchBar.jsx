import React from "react";

import styles from "./searchBar.module.scss";

const SearchBar = (props) => {
  const { length, ...rest } = props;

  return (
    <div className={styles.wrapper}>
      <span className={styles.length}>{length}</span>
      <input className={styles.input} {...rest} />
    </div>
  );
};

export default SearchBar;
