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
    case "SET_AUDIO_CONTENT":
      return {
        ...state,
        audio: action.payload,
      };
    default:
      return { ...state };
  }
};

const INITIAL_STATE = {
  loading: true,
  podcast: [],
  audio: {},
};

const NAMESPACES = {
  detail: "podcasts_details",
};

const DetailProvider = ({ children }) => {
  const { podcastId, episodeId } = useParams();

  console.log(useParams());

  const { setLoading } = useAppContext();

  const [state, dispatch] = useReducer(detailReducer, INITIAL_STATE);

  const TIMESTAMP = Date.now();

  const ONE_DAY = 1000 * 60 * 60 * 24; // one day

  useEffect(() => {
    setLoading(true);

    // detail page
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

    // audio page
    if (podcastId && episodeId) {
      const getAudioDetails = async () => {
        try {
          // const res = await axios(
          //   `https://api.allorigins.win/get?url=${encodeURIComponent(
          //     "https://itunes.apple.com"
          //   )}/lookup?id=${podcastId}&entity=podcastEpisode`
          // );

          // const res = await axios(
          //   `https://api.allorigins.win/get?url=${encodeURIComponent(
          //     "https://itunes.apple.com"
          //   )}/lookup?id=${podcastId}&media=podcast &entity=podcast`
          // );

          const { data } = await axios(
            `https://itunes.apple.com/lookup?id=${podcastId}&entity=podcastEpisode`
          );

          const audioDetail = data.results.find(
            ({ trackId }) => trackId == episodeId
          );
          dispatch({ type: "SET_AUDIO_CONTENT", payload: audioDetail });
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      getAudioDetails();
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
