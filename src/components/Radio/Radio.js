import React from "react";
import cx from "classnames";
import styles from "./Radio.css";

export default function InputRadio({
  id,
  className,
  value,
  checked,
  onChange,
  label,
}) {
  return (
    <div className={cx(styles.container, className)}>
      <input
        id={id}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
