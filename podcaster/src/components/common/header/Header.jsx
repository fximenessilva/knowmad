import React from "react";
import { Link } from "react-router-dom";

import Loading from "./Loading";
import styles from "./header.module.scss";
import { useAppContext } from "../../../contexts/AppContext";

const Header = () => {
  const { loading } = useAppContext();
  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">Podcaster</Link>
      </h1>
      {loading ? <Loading /> : null}
    </header>
  );
};

export default Header;
