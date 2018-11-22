import React from "react";
import { useStore } from "easy-peasy";
import { Editor, RichUtils, EditorState, ContentState } from "draft-js";

import userEditorState from "../../hooks/useEditorState";
import "draft-js/dist/Draft.css";
import { FONTS, DEFAULT_TEXT } from "../../constants/constants";
import styles from "./Editor.css";

export default function MyEditor() {
  const [editorState, setEditorState] = userEditorState();
  const font = useStore(state => state.settings.font);
  const fontSize = useStore(state => state.settings.fontSize);

  function onChange(e) {
    return setEditorState(e);
  }

  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  const styleMap = {
    BOLD: {
      fontWeight: "700",
    },
  };

  const fontStyle = {
    fontFamily: font,
    fontSize,
  };

  return (
    // <div className={styles[font.split(" ").join("-")]}>
    <div style={fontStyle}>
      <Editor
        editorState={editorState}
        customStyleMap={styleMap}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
      />
    </div>
  );
}
