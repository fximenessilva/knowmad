import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { useAppContext } from "./AppContext";

const AudioContext = createContext({});

const detailReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_AUDIO_CONTENT":
      return {
        ...state,
        audio: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

const INITIAL_STATE = {
  loading: true,
  audio: {},
  error: null,
};

const AudioProvider = ({ children }) => {
  const { podcastId, episodeId } = useParams();

  const { setLoading } = useAppContext();

  const [state, dispatch] = useReducer(detailReducer, INITIAL_STATE);

  useEffect(() => {
    setLoading(true);

    // audio page
    const getAudioDetails = async () => {
      try {
        const { data } = await axios(
          `https://itunes.apple.com/lookup?id=${podcastId}&entity=podcastEpisode`
        );

        const audioDetail = data.results.find(
          ({ trackId }) => trackId == episodeId
        );
        dispatch({ type: "SET_AUDIO_CONTENT", payload: audioDetail });
      } catch (error) {
        console.log(error);
        dispatch({ type: "SET_ERROR", payload: error.message });
      } finally {
        setLoading(false);
      }
    };
    getAudioDetails();
  }, []);

  return (
    <AudioContext.Provider value={{ state, dispatch }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);

export default AudioProvider;
