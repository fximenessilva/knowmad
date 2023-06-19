import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

import { useAppContext } from "./AppContext";

const ListContext = createContext({});

const listReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_SEARCHTERM":
      return {
        ...state,
        searchTerm: action.payload,
      };
    case "SET_PODCASTS":
      return {
        ...state,
        podcasts: action.payload,
      };
    default:
      return { ...state };
  }
};

const INITIAL_STATE = {
  loading: true,
  podcasts: [],
  searchTerm: "",
};

const PODCASTS_ENDPOINT =
  "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";

const a = `https://api.allorigins.win/get?url=${encodeURIComponent(
  "https://itunes.apple.com"
)}`;

const NAMESPACES = { expiry: "podcast_expiry_date", list: "podcasts_list" };

const ONE_DAY = 1000 * 60 * 60 * 24; // one day

const ListProvider = ({ children }) => {
  const { setLoading } = useAppContext();

  const [state, dispatch] = useReducer(listReducer, INITIAL_STATE);

  const setPodcasts = (payload) =>
    dispatch({
      type: "SET_PODCASTS",
      payload,
    });

  const TIMESTAMP = Date.now();

  useEffect(() => {
    setLoading(true);

    const setExpiration = () => {
      localStorage.setItem(
        NAMESPACES.expiry,
        JSON.stringify({
          initial: TIMESTAMP,
          expiresOn: TIMESTAMP + ONE_DAY,
        })
      );
    };
    const getPodcasts = async () => {
      try {
        const { data } = await axios(PODCASTS_ENDPOINT);
        const {
          feed: { entry },
        } = data;
        localStorage.setItem(NAMESPACES.list, JSON.stringify(entry));
        setPodcasts(entry);
        console.log("API REQUEST", { podcasts: entry });
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
        setLoading(false);
      }
    };

    if (!JSON.parse(localStorage.getItem(NAMESPACES.expiry))) {
      setExpiration();
      getPodcasts();
    } else {
      const EXPIRE_DATE = JSON.parse(
        localStorage.getItem(NAMESPACES.expiry)
      ).expiresOn;

      if (Date.now() > EXPIRE_DATE) {
        setExpiration();
        getPodcasts();
      } else {
        const LIST = JSON.parse(localStorage.getItem(NAMESPACES.list));
        setPodcasts(LIST);
        setLoading(false);
      }
    }
  }, []);

  return (
    <ListContext.Provider value={{ state, dispatch }}>
      {children}
    </ListContext.Provider>
  );
};

export const useListContext = () => useContext(ListContext);

export default ListProvider;
