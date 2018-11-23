import React from "react";
import { useStore, useAction } from "easy-peasy";
import cx from "classnames";
import styles from "./SettingsButton.css";

export default function SettingsButton() {
  const settingsOpen = useStore(state => state.settings.open);
  const nightmode = useStore(state => state.settings.nightmode);
  const edit = useAction(dispatch => dispatch.settings.edit);
  const toggleSettings = () => edit({ field: "open", value: !settingsOpen });
  return (
    <button
      className={cx(styles.settingsButton, {
        [styles.nightmode]: nightmode,
        [styles.settingsOpen]: settingsOpen,
      })}
      onClick={toggleSettings}
    >
      <i className="material-icons">{settingsOpen ? "close" : "menu"}</i>
    </button>
  );
}
