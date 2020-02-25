import React from "react";
import { useStore, useActions } from "easy-peasy";
import cx from "classnames";

import Editor from "./components/Editor/Editor";
import Settings from "./components/Settings/Settings";
import NotesList from "./components/NotesList/NotesList";
import SidebarButton from "./components/SidebarButton/SidebarButton";
import useAuth from "./hooks/useAuth";
import Loading from "./components/Loading/Loading";

import styles from "./App.css";

export default function App() {
  const logged = useAuth();
  const settingsOpen = useStore(state => state.settings.open);
  const nightmode = useStore(state => state.settings.nightmode);
  const edit = useActions(dispatch => dispatch.settings.edit);
  const closeSettings = useActions(dispatch => dispatch.settings.closeSettings);
  const listOpen = useStore(state => state.notes.listOpen);
  const toggleList = useActions(dispatch => dispatch.notes.toggleList);
  const closeList = useActions(dispatch => dispatch.notes.closeList);

  if (!logged) {
    return (
      <main className={cx(styles.container, styles.loading)}>
        <Loading />
      </main>
    );
  }

  function toggleSettings() {
    edit({ field: "open", value: !settingsOpen });
    closeList();
  }

  function openList() {
    toggleList();
    closeSettings();
  }

  return (
    <main
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
    </main>
  );
}
