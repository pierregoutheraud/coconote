import React from "react";
import styles from "./Loading.css";

export default function Loading() {
  // return <div className={styles.spinner}></div>;
  return (
    <div className={styles.spinner}>
      <div className={styles.doubleBounce1}></div>
      <div className={styles.doubleBounce2}></div>
    </div>
  );
}
