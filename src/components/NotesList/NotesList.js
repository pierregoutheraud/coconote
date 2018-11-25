import React from "react";
import { useStore, useAction } from "easy-peasy";
import cx from "classnames";

import Icon from "../Icon/Icon";
import styles from "./NotesList.css";

export default function NotesList({ className }) {
  const list = useStore(state => state.notes.list);
  const currentNote = useStore(state => state.notes.currentNote);
  const createNote = useAction(dispatch => dispatch.notes.create);
  const selectNote = useAction(dispatch => dispatch.notes.select);
  const setTitle = useAction(dispatch => dispatch.notes.setTitle);
  const deleteCurrentNote = useAction(dispatch => dispatch.notes.deleteCurrent);

  function handleChangeTitle(e, id) {
    const { value } = e.target;
    setTitle({ id, title: value });
  }

  function handleClickDelete() {
    const res = window.confirm("Are you sure you want to remove this note ?");
    if (!res) {
      return;
    }
    deleteCurrentNote();
  }

  const _list = list.map(note => {
    return (
      <button
        key={note.id}
        className={cx(styles.note, {
          [styles.active]: note.id === currentNote.id,
        })}
        onClick={() => selectNote(note.id)}
      >
        <input
          type="text"
          defaultValue={note.title}
          onChange={e => handleChangeTitle(e, note.id)}
        />
      </button>
    );
  });

  return (
    <aside className={cx(styles.container, className)}>
      <div className={styles.notes}>{_list}</div>
      <div className={styles.buttons}>
        {list.length < 30 && (
          <Icon
            className={cx(styles.icon, styles.add)}
            size={28}
            name="add"
            onClick={createNote}
            title="Add a note"
          />
        )}
        {list.length > 1 && (
          <Icon
            className={cx(styles.icon, styles.remove)}
            onClick={handleClickDelete}
            name="delete_forever"
            size={26}
            title="Delete current note"
          />
        )}
      </div>

      {/* <button className={styles.add}>
        <i className="material-icons">add_box</i>
      </button> */}
    </aside>
  );
}
