import React from "react";
import { useStore } from "easy-peasy";
import cx from "classnames";

import Editor from "./components/Editor/Editor";
import Settings from "./components/Settings/Settings";
import SettingsButton from "./components/SettingsButton/SettingsButton";
import styles from "./App.css";

export default function App() {
  const settingsOpen = useStore(state => state.settings.open);
  const nightmode = useStore(state => state.settings.nightmode);

  return (
    <div
      className={cx(styles.container, {
        [styles.settingsOpen]: settingsOpen,
        [styles.nightmode]: nightmode,
      })}
    >
      <SettingsButton />
      <Settings className={styles.settings} />
      <section className={styles.editor}>
        <Editor />
      </section>
    </div>
  );
}
