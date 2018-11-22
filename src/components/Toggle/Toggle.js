import React, { useState } from "react";
import cx from "classnames";
import styles from "./Toggle.css";

// https://codepen.io/AlexJedi/pen/PKdxYE
export default function Toggle({ defaultValue, onChange }) {
  const [active, setActive] = useState(defaultValue);
  const _setActive = () => {
    const newActive = !active;
    setActive(newActive);
    onChange(newActive);
  };
  return (
    <div
      className={cx(styles.body, { [styles.active]: active })}
      onClick={_setActive}
    >
      <div className={styles.btn} />
    </div>
  );
}
