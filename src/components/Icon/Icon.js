import React from "react";
import cx from "classnames";
import styles from "./Icon.css";

export default function Icon(props) {
  const {
    className,
    name,
    size = 20,
    onClick,
    onMouseDown,
    title = "",
  } = props;

  if (onClick || onMouseDown) {
    const { className, ...rest } = props;
    return (
      <button
        className={cx(styles.container, className)}
        title={title}
        {...rest}
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
