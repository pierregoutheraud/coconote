import React from "react";
import cx from "classnames";
import { SortableHandle } from "react-sortable-hoc";

import Icon from "../Icon/Icon";
import styles from "./NotesListItem.css";

const DragHandle = SortableHandle(() => (
  <Icon
    className={styles.handle}
    name="drag_handle"
    size={28}
    title="Remove note"
  />
));

export default function NotesListItem({
  note,
  currentNote,
  onClick,
  onChange,
}) {
  return (
    <li
      className={cx(styles.note, {
        [styles.active]: note.id === currentNote.id,
      })}
      onClick={onClick}
    >
      <DragHandle />
      <button>
        <input type="text" defaultValue={note.title} onChange={onChange} />
      </button>
    </li>
  );
}
