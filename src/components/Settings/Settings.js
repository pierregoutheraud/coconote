import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import cx from "classnames";
import FileSaver from "file-saver";

import styles from "./Settings.css";
import { FONTS } from "../../constants/constants";
import Toggle from "../Toggle/Toggle";
import Radio from "../Radio/Radio";
import { getStore } from "../../store/configureStore";

export default function Settings({ className }) {
  const font = useStoreState(state => state.settings.font);
  const fontSize = useStoreState(state => state.settings.fontSize);
  const nightmode = useStoreState(state => state.settings.nightmode);
  const setFont = useStoreActions(dispatch => dispatch.settings.setFont);
  const smallerFontSize = useStoreActions(
    dispatch => dispatch.settings.smallerFontSize
  );
  const biggerFontSize = useStoreActions(
    dispatch => dispatch.settings.biggerFontSize
  );
  const edit = useStoreActions(dispatch => dispatch.settings.edit);

  const fonts = FONTS.map(f => {
    return (
      <Radio
        key={f}
        className={styles.radio}
        id={`id_${f}`}
        value={f}
        checked={f === font}
        onChange={() => {
          setFont(f);
        }}
        label={f}
      />
    );
  });

  function handleClickExport(e) {
    e.preventDefault();
    const {
      notes: { list },
    } = getStore().getState();

    const notesTexts = list
      .filter(l => l.content && l.content.blocks && l.content.blocks.length)
      .map(l => {
        return l.content.blocks.map(v => v.text).join("\n");
      })
      .reduce((acc, curr, i) => {
        return i === 0
          ? [...acc, curr]
          : [...acc, "\n\n-----------------\n\n", curr];
      }, []);

    var blob = new Blob(notesTexts, {
      type: "text/plain;charset=utf-8",
    });
    FileSaver.saveAs(
      blob,
      `coconote_notes_${new Date().toLocaleDateString()}.txt`
    );
  }

  return (
    <aside
      className={cx(styles.container, className, {
        [styles.nightmode]: nightmode,
      })}
    >
      <fieldset className={cx(styles.fieldset, styles.font)}>
        <h3>Font family</h3>
        <div className={styles.choices}>{fonts}</div>
      </fieldset>

      <fieldset className={cx(styles.fieldset, styles.fontSize)}>
        <h3>Font size</h3>
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

      <fieldset className={styles.fieldset}>
        <h3>Night mode</h3>
        <div className={styles.choices}>
          <Toggle
            defaultValue={nightmode}
            onChange={value => edit({ field: "nightmode", value })}
          />
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <h3>Backup notes</h3>
        <a href="" onClick={handleClickExport}>
          Export as text file
        </a>
      </fieldset>
    </aside>
  );
}
