import React from "react";
import { useStore, useAction } from "easy-peasy";
import cx from "classnames";

import Editor from "./components/Editor/Editor";
import Settings from "./components/Settings/Settings";
import SidebarButton from "./components/SidebarButton/SidebarButton";
import styles from "./App.css";

export default function App() {
  const settingsOpen = useStore(state => state.settings.open);
  const nightmode = useStore(state => state.settings.nightmode);

  const edit = useAction(dispatch => dispatch.settings.edit);
  const toggleSettings = () => edit({ field: "open", value: !settingsOpen });

  return (
    <div
      className={cx(styles.container, {
        [styles.settingsOpen]: settingsOpen,
        [styles.nightmode]: nightmode,
      })}
    >
      <SidebarButton
        className={styles.settingsButton}
        classNameActive={styles.settingsButtonActive}
        defaultIcon="more_vert"
        isActive={settingsOpen}
        onClick={toggleSettings}
      />
      {/* <SidebarButton
        className={styles.menuButton}
        classNameActive={styles.menuButtonActive}
        defaultIcon="menu"
        isActive={false}
        onClick={() => {}}
      /> */}
      <Settings className={styles.settings} />
      <section className={styles.editor}>
        <Editor />
      </section>
    </div>
  );
}
