import React from "react";
import { useStore } from "easy-peasy";
import cx from "classnames";
import styles from "./SidebarButton.css";

export default function SidebarButton({
  className,
  classNameActive,
  defaultIcon,
  isActive,
  onClick,
}) {
  const nightmode = useStore(state => state.settings.nightmode);

  return (
    <button
      className={cx(styles.settingsButton, className, {
        [styles.nightmode]: nightmode,
        [classNameActive]: isActive,
      })}
      onClick={onClick}
    >
      <i className="material-icons">{isActive ? "close" : defaultIcon}</i>
    </button>
  );
}
