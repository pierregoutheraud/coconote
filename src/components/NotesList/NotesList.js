import React from "react";
import { useStore, useActions } from "easy-peasy";
import cx from "classnames";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";

import Icon from "../Icon/Icon";
import styles from "./NotesList.css";
import NotesListItem from "./NoteListItem";

const SortableItem = SortableElement(NotesListItem);

// const SortableItem = SortableElement(({ note }) => (
//   <li style={{ height: 50, color: "white" }}>{note.title}</li>
// ));

const SortableList = SortableContainer(({ items, currentNote, selectNote }) => {
  const setTitle = useActions(dispatch => dispatch.notes.setTitle);
  function handleChangeTitle(e, id) {
    const { value } = e.target;
    setTitle({ id, title: value });
  }

  return (
    <ul className={styles.notes}>
      {items.map((note, index) => (
        <SortableItem
          key={note.id}
          index={index}
          onClick={() => selectNote(note.id)}
          onChange={e => handleChangeTitle(e, note.id)}
          note={note}
          currentNote={currentNote}
        />
      ))}
    </ul>
  );
});

export default function NotesList({ className }) {
  const list = useStore(state => state.notes.list);
  const currentNote = useStore(state => state.notes.currentNote);
  const createNote = useActions(dispatch => dispatch.notes.create);
  const selectNote = useActions(dispatch => dispatch.notes.select);
  const moveNote = useActions(dispatch => dispatch.notes.moveNote);
  const deleteCurrentNote = useActions(
    dispatch => dispatch.notes.deleteCurrent
  );

  function handleClickDelete() {
    const res = window.confirm(
      "Are you sure you want to remove the current note ?"
    );
    if (!res) {
      return;
    }
    deleteCurrentNote();
  }

  return (
    <aside className={cx(styles.container, className)}>
      <SortableList
        items={list}
        currentNote={currentNote}
        selectNote={selectNote}
        onSortEnd={moveNote}
        helperClass={styles.sortableHelper}
        axis="y"
        lockAxis="y"
        useDragHandle
        lockToContainerEdges
        lockOffset="0%"
      />
      <div className={styles.buttons}>
        {list.length < 30 && (
          <Icon
            className={cx(styles.icon, styles.add)}
            size={28}
            name="note_add"
            onClick={createNote}
            title="Add a note"
          />
        )}
        {list.length > 1 && (
          <Icon
            className={cx(styles.icon, styles.remove)}
            onClick={handleClickDelete}
            name="delete_forever"
            size={33}
            title="Remove note"
          />
        )}
      </div>
      {/* <button className={styles.add}>
        <i className="material-icons">add_box</i>
      </button> */}
    </aside>
  );
}
