import React from "react";
import { useStore, useActions } from "easy-peasy";
import cx from "classnames";

import Icon from "../Icon/Icon";
import styles from "./NotesList.css";
import NotesListItem from "./NoteListItem";

export default function NotesList({ className }) {
  const list = useStore(state => state.notes.list);
  const currentNote = useStore(state => state.notes.currentNote);
  const createNote = useActions(dispatch => dispatch.notes.create);
  const selectNote = useActions(dispatch => dispatch.notes.select);
  const setTitle = useActions(dispatch => dispatch.notes.setTitle);
  const deleteCurrentNote = useActions(
    dispatch => dispatch.notes.deleteCurrent
  );

  function handleChangeTitle(e, id) {
    const { value } = e.target;
    setTitle({ id, title: value });
  }

  function handleClickDelete() {
    const res = window.confirm(
      "Are you sure you want to remove the current note ?"
    );
    if (!res) {
      return;
    }
    deleteCurrentNote();
  }

  const _list = list.map(note => {
    return (
      <NotesListItem
        key={note.id}
        onClick={() => selectNote(note.id)}
        onChange={e => handleChangeTitle(e, note.id)}
        note={note}
        currentNote={currentNote}
      />
    );
  });

  return (
    <aside className={cx(styles.container, className)}>
      <div className={styles.notes}>{_list}</div>
      <div className={styles.buttons}>
        {list.length > 1 && (
          <Icon
            className={cx(styles.icon, styles.remove)}
            onClick={handleClickDelete}
            name="remove"
            size={28}
            title="Remove note"
          />
        )}
        {list.length < 30 && (
          <Icon
            className={cx(styles.icon, styles.add)}
            size={28}
            name="add"
            onClick={createNote}
            title="Add a note"
          />
        )}
      </div>

      {/* <button className={styles.add}>
        <i className="material-icons">add_box</i>
      </button> */}
    </aside>
  );
}
