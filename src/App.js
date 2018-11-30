import React from "react";
import { useStore, useAction } from "easy-peasy";
import cx from "classnames";

import Editor from "./components/Editor/Editor";
import Settings from "./components/Settings/Settings";
import NotesList from "./components/NotesList/NotesList";
import SidebarButton from "./components/SidebarButton/SidebarButton";

import styles from "./App.css";

export default function App() {
  const settingsOpen = useStore(state => state.settings.open);
  const nightmode = useStore(state => state.settings.nightmode);
  const edit = useAction(dispatch => dispatch.settings.edit);
  const closeSettings = useAction(dispatch => dispatch.settings.closeSettings);
  const listOpen = useStore(state => state.notes.listOpen);
  const toggleList = useAction(dispatch => dispatch.notes.toggleList);
  const closeList = useAction(dispatch => dispatch.notes.closeList);

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
