import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import cx from "classnames";

import Editor from "./components/Editor/Editor";
import Settings from "./components/Settings/Settings";
import NotesList from "./components/NotesList/NotesList";
import SidebarButton from "./components/SidebarButton/SidebarButton";

import styles from "./App.css";

export default function App() {
  const settingsOpen = useStoreState(state => state.settings.open);
  const nightmode = useStoreState(state => state.settings.nightmode);
  const edit = useStoreActions(dispatch => dispatch.settings.edit);
  const closeSettings = useStoreActions(
    dispatch => dispatch.settings.closeSettings
  );
  const listOpen = useStoreState(state => state.notes.listOpen);
  const toggleList = useStoreActions(dispatch => dispatch.notes.toggleList);
  const closeList = useStoreActions(dispatch => dispatch.notes.closeList);

  function toggleSettings() {
    edit({ field: "open", value: !settingsOpen });
    closeList();
  }

  function openList() {
    toggleList();
    closeSettings();
  }

  return (
    <div
      className={cx(styles.container, {
        [styles.settingsOpen]: settingsOpen,
        [styles.listOpen]: listOpen,
        [styles.nightmode]: nightmode,
      })}
    >
      <SidebarButton
        className={styles.settingsButton}
        classNameActive={styles.settingsButtonActive}
        defaultIcon="more_vert"
        isActive={settingsOpen}
        isHidden={listOpen}
        onClick={toggleSettings}
      />
      <Settings className={styles.settings} />
      <SidebarButton
        className={styles.menuButton}
        classNameActive={styles.menuButtonActive}
        defaultIcon="menu"
        isActive={listOpen}
        isHidden={settingsOpen}
        onClick={openList}
      />
      <NotesList className={styles.notesList} />
      <section className={styles.editor}>
        <Editor />
      </section>
    </div>
  );
}
