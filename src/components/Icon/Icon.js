import React from "react";
import cx from "classnames";
import styles from "./Icon.css";

export default function Icon({
  className,
  name,
  size = 20,
  onClick,
  title = "",
}) {
  if (onClick) {
    return (
      <button
        className={cx(styles.container, className)}
        onClick={onClick}
        title={title}
      >
        <i
          className={cx("material-icons", styles.icon)}
          style={{ fontSize: size + "px" }}
        >
          {name}
        </i>
      </button>
    );
  }

  return (
    <div className={cx(styles.container, className)}>
      <i
        className={cx("material-icons", styles.icon)}
        style={{ fontSize: size + "px" }}
      >
        {name}
      </i>
    </div>
  );
}
