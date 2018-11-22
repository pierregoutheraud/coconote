import React from "react";
import { useStore, useAction } from "easy-peasy";
import cx from "classnames";
import styles from "./Settings.css";
import { FONTS } from "../../constants/constants";

export default function Settings({ className }) {
  const font = useStore(state => state.settings.font);
  const fontSize = useStore(state => state.settings.fontSize);
  const setFont = useAction(dispatch => dispatch.settings.setFont);
  const smallerFontSize = useAction(
    dispatch => dispatch.settings.smallerFontSize
  );
  const biggerFontSize = useAction(
    dispatch => dispatch.settings.biggerFontSize
  );

  const fonts = Object.keys(FONTS).map(f => {
    return (
      <div className={styles.radio} key={f}>
        <input
          type="radio"
          value={f}
          checked={f === font}
          onChange={() => {
            setFont(f);
          }}
        />
        <label>{f}</label>
      </div>
    );
  });

  return (
    <aside className={cx(styles.container, className)}>
      <fieldset className={styles.fieldset}>
        <h3>Font Family</h3>
        <div className={styles.choices}>{fonts}</div>
      </fieldset>
      <fieldset className={cx(styles.fieldset, styles.fontSize)}>
        <h3>Font Size</h3>
        <div className={styles.choices}>
          <button onClick={smallerFontSize}>
            <i className="material-icons">remove</i>
          </button>
          <span>{fontSize}</span>
          <button onClick={biggerFontSize}>
            <i className="material-icons">add</i>
          </button>
        </div>
      </fieldset>
    </aside>
  );
}
