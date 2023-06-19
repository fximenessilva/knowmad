import React from "react";
import PropTypes from "prop-types";

import styles from "./audioPlayer.module.scss";

const AudioPlayer = ({ title, description, audioSrc }) => {
  return (
    <div className={styles.player} data-testid="audio-player">
      <h1 data-testid="title">{title}</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: description,
        }}
        data-testid="description"
      />
      <audio data-testid="audio" controls src={audioSrc} />
    </div>
  );
};

AudioPlayer.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  audioSrc: PropTypes.string.isRequired,
};

export default AudioPlayer;
