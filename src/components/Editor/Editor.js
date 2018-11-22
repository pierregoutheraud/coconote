import React, { useEffect, useState } from "react";
import { Editor, RichUtils } from "draft-js";
import userEditorState from "../../hooks/useEditorState";
import "draft-js/dist/Draft.css";
import "./Editor.css";

export default function MyEditor() {
  const [editorState, setEditorState] = userEditorState();

  if (editorState === null) {
    return <p>loading...</p>;
  }

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

  return (
    <Editor
      editorState={editorState}
      customStyleMap={styleMap}
      handleKeyCommand={handleKeyCommand}
      onChange={onChange}
    />
  );
}
