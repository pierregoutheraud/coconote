import React from "react";
import cx from "classnames";

import styles from "./NotesListItem.css";

export default function NotesListItem({
  note,
  currentNote,
  onClick,
  onChange,
}) {
  return (
    <button
      className={cx(styles.note, {
        [styles.active]: note.id === currentNote.id,
      })}
      onClick={onClick}
    >
      <input type="text" defaultValue={note.title} onChange={onChange} />
    </button>
  );
}
