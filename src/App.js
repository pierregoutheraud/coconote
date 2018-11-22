import React from "react";
import { useStore, useAction } from "easy-peasy";
import cx from "classnames";

import Editor from "./components/Editor/Editor";
import Settings from "./components/Settings/Settings";
import styles from "./App.css";

export default function App() {
  const settingsOpen = useStore(state => state.settings.open);
  const edit = useAction(dispatch => dispatch.settings.edit);
  const toggleSettings = () => edit({ field: "open", value: !settingsOpen });
  const nightmode = useStore(state => state.settings.nightmode);

  function handleClickSettings() {
    toggleSettings();
  }

  return (
    <div
      className={cx(styles.container, {
        [styles.settingsOpen]: settingsOpen,
        [styles.nightmode]: nightmode,
      })}
    >
      <Settings className={styles.settings} />
      <section className={styles.editor}>
        <button className={styles.settingsButton} onClick={handleClickSettings}>
          <i className="material-icons">{settingsOpen ? "close" : "menu"}</i>
        </button>
        <Editor />
      </section>
    </div>
  );
}
