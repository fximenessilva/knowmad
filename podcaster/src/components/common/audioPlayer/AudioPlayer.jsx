import React from "react";

import styles from "./audioPlayer.module.scss";

const AudioPlayer = ({ title, description, audioSrc }) => {
  return (
    <div className={styles.player}>
      <h1>{title}</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
      <audio controls src={audioSrc} />
    </div>
  );
};

export default AudioPlayer;
