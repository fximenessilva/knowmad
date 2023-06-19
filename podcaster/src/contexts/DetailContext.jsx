import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { useAppContext } from "./AppContext";

const DetailContext = createContext({});

const detailReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_PODCAST":
      return {
        ...state,
        podcast: action.payload,
      };
    default:
      return { ...state };
  }
};

const INITIAL_STATE = {
  loading: true,
  podcast: [],
};

const NAMESPACES = {
  detail: "podcasts_details",
};

const DetailProvider = ({ children }) => {
  const { podcastId } = useParams();

  const { setLoading } = useAppContext();

  const [state, dispatch] = useReducer(detailReducer, INITIAL_STATE);

  const TIMESTAMP = Date.now();

  const ONE_DAY = 1000 * 60 * 60 * 24; // one day

  useEffect(() => {
    setLoading(true);

    const detailsList = localStorage.getItem(NAMESPACES.detail);
    const parsedList = JSON.parse(detailsList);

    const localStorageSetter = (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    };

    const getDetail = async () => {
      const PODCAST_ENDPOINT = `https://itunes.apple.com/lookup?id=${podcastId}&entity=podcastEpisode`;
      try {
        const {
          data: { results },
        } = await axios(PODCAST_ENDPOINT);

        // if it is the first time a client visits one detail, set this detail in localStorage
        if (detailsList === null) {
          localStorageSetter(NAMESPACES.detail, {
            [podcastId]: {
              data: results,
              expire: {
                initial: TIMESTAMP,
                expiresOn: TIMESTAMP + ONE_DAY,
              },
            },
          });
        } else {
          if (!(podcastId in parsedList)) {
            // if the client hasn't visited the detail, set this detail in localStorage

            localStorageSetter(NAMESPACES.detail, {
              ...parsedList,
              [podcastId]: {
                data: results,
                expire: {
                  initial: TIMESTAMP,
                  expiresOn: TIMESTAMP + ONE_DAY,
                },
              },
            });
          }
          // impossible scenario
          //   else {
          //     // if the client has already visited the detail and the expire data is less than one day, renew expire date, set this detail in localStorage
          //     const updatedObj = {
          //       ...parsedList,
          //       [podcastId]: {
          //         ...parsedList[podcastId],
          //         expire: {
          //           initial: TIMESTAMP,
          //           expiresOn: TIMESTAMP + ONE_DAY,
          //         },
          //       },
          //     };
          //     localStorage.setItem(NAMESPACES.detail, JSON.stringify(updatedObj));
          //   }
        }

        dispatch({ type: "SET_PODCAST", payload: results });
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
        setLoading(false);
      }
    };

    if (detailsList === null) {
      getDetail();
    } else {
      if (podcastId in parsedList) {
        const EXPIRE_DATE = parsedList[podcastId].expiresOn;

        if (Date.now() > EXPIRE_DATE) {
          // if the client has already visited the detail, but it has already passed one day, fetch the detail
          getDetail();
        } else {
          // if the client has already visited the detail, and it has not passed one day, set state with the detail
          dispatch({
            type: "SET_PODCAST",
            payload: parsedList[podcastId].data,
          });
          dispatch({ type: "SET_LOADING", payload: false });
          setLoading(false);
        }
      } else {
        getDetail();
      }
    }
  }, []);

  return (
    <DetailContext.Provider value={{ state, dispatch }}>
      {children}
    </DetailContext.Provider>
  );
};

export const useDetailContext = () => useContext(DetailContext);

export default DetailProvider;
