import React, { useEffect, useState } from "react";

import { RichUtils, getVisibleSelectionRect } from "draft-js";
import cx from "classnames";

import Icon from "../Icon/Icon";
import styles from "./EditorToolbar.css";

function useMergeState(initialState) {
  const [state, setState] = useState(initialState);
  const setMergedState = newState =>
    setState(prevState => ({ ...prevState, ...newState }));
  return [state, setMergedState];
}

export default function EditorToolbar({ editorState, onChange }) {
  const [state, setState] = useMergeState({ position: {}, visible: false });

  useEffect(() => {
    if (!editorState) {
      return;
    }
    const selectionState = editorState.getSelection();
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();
    if (start !== end) {
      onSelection();
    } else {
      setState({ visible: false });
    }
  }, [editorState]);

  function onSelection() {
    const selectionRect = getVisibleSelectionRect(window);

    if (!selectionRect) {
      return;
    }

    const newPosition = {
      top: selectionRect.top + selectionRect.height,
      left: selectionRect.left + selectionRect.width / 2,
    };

    // if (newPosition.top < 50) {
    //   newPosition.top = selectionRect.bottom + 50;
    // }

    // if (
    //   position.top === newPosition.top &&
    //   position.left === newPosition.left
    // ) {
    //   return;
    // }

    setState({ position: newPosition, visible: true });
  }

  function setStyle(style) {
    return function(e) {
      e.preventDefault();
      onChange(RichUtils.toggleInlineStyle(editorState, style));
    };
  }

  function setBlockType(blockType) {
    return function(e) {
      event.preventDefault();
      onChange(RichUtils.toggleBlockType(editorState, blockType));
    };
  }

  const { position, visible } = state;

  return (
    <div
      className={cx(styles.container, {
        [styles.visible]: visible,
      })}
      style={!!position && position}
    >
      <Icon
        className={styles.icon}
        name="format_bold"
        size={24}
        title="Bold"
        onMouseDown={setStyle("BOLD")}
      />
      <Icon
        className={styles.icon}
        name="format_italic"
        size={24}
        title="Italic"
        onMouseDown={setStyle("ITALIC")}
      />
      <Icon
        className={styles.icon}
        name="format_underlined"
        size={20}
        title="Underline"
        onMouseDown={setStyle("UNDERLINE")}
      />
      <Icon
        className={styles.icon}
        name="title"
        size={20}
        title="Title"
        onMouseDown={setBlockType("header-one")}
      />
    </div>
  );
}
