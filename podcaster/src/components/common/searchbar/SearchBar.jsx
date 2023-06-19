import React from "react";
import PropTypes from "prop-types";

import styles from "./searchBar.module.scss";

const SearchBar = (props) => {
  const { length, ...rest } = props;

  return (
    <div data-testid="searchbar" className={styles.wrapper}>
      <span className={styles.length}>{length}</span>
      <input className={styles.input} {...rest} />
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default SearchBar;
