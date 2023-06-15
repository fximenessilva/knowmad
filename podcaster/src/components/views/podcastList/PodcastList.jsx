import React from "react";
import { Link } from "react-router-dom";

import { useListContext } from "contexts/ListContext";
import PodcastCard from "../../common/card/PodcastCard";
import SearchBar from "../../common/searchbar/SearchBar";
import styles from "./podcastList.module.scss";

const PodcastList = () => {
  const { state, dispatch } = useListContext();
  const { podcasts, searchTerm } = state;

  const filterCallBack = (el) => {
    const title = el.title.label.toLowerCase();
    const author = el["im:artist"].label.toLowerCase();
    const term = searchTerm.toLowerCase();
    if (searchTerm === "") {
      return el;
    } else {
      return title.includes(term) || author.includes(term);
    }
  };

  const list = podcasts.filter(filterCallBack);

  return (
    <div className={styles.wrapper}>
      <SearchBar
        value={searchTerm}
        placeholder="Filter podcasts"
        onChange={(e) =>
          dispatch({ type: "SET_SEARCHTERM", payload: e.target.value })
        }
        length={list.length}
        type="text"
      />
      <List list={list} searchTerm={searchTerm} />
    </div>
  );
};

const List = ({ list, searchTerm }) => {
  return (
    <ul className={styles["list-wrapper"]}>
      {list.length ? (
        list.map((el) => {
          const props = {
            title: el.title.label,
            author: el["im:artist"].label,
            imgSrc: el["im:image"][2].label,
          };
          return (
            <li className={styles.item} key={el.id.attributes["im:id"]}>
              <Link to={`podcast/${el.id.attributes["im:id"]}`}>
                <PodcastCard {...props} />
              </Link>
            </li>
          );
        })
      ) : (
        <div>No podcasts found matching "{searchTerm}"</div>
      )}
    </ul>
  );
};

export default PodcastList;
