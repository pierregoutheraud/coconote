import { useState } from "react";
import { useStore, useAction } from "easy-peasy";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";

let timeout = null;

export default function useEditorState() {
  const contentStateRaw = useStore(state => state.editor.contentStateRaw);
  const setContentStateRaw = useAction(
    dispatch => dispatch.editor.setContentStateRaw
  );

  let initialEditorState;
  if (typeof contentStateRaw === "undefined") {
    initialEditorState = EditorState.createEmpty();
  } else {
    const contentState = convertFromRaw(contentStateRaw);
    initialEditorState = EditorState.createWithContent(contentState);
  }
  const [editorState, _setEditorState] = useState(initialEditorState);

  function setEditorState(editorState, save = true) {
    _setEditorState(editorState);
    if (!save) {
      return;
    }

    // Save contentState to global state
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const contentState = editorState.getCurrentContent();
      const contentStateRaw = convertToRaw(contentState);
      setContentStateRaw(contentStateRaw);
    }, 300);
  }

  return [editorState, setEditorState];
}
