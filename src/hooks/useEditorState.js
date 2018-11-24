import { useState, useEffect } from "react";
import { useStore, useAction } from "easy-peasy";
import {
  ContentState,
  EditorState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import {
  DEFAULT_TEXT,
  DEFAULT_CONTENT_STATE_RAW,
} from "../constants/constants";

let timeout = null;

export default function useEditorState() {
  const contentStateRaw = useStore(state => state.editor.contentStateRaw);
  const setContentStateRaw = useAction(
    dispatch => dispatch.editor.setContentStateRaw
  );

  const [editorState, _setEditorState] = useState(null);

  // Initial state from global state
  useEffect(() => {
    // initial editor state from global state OR empty
    let initialEditorState;
    if (typeof contentStateRaw === "undefined") {
      // initialEditorState = EditorState.createWithContent(
      //   ContentState.createFromText(DEFAULT_TEXT)
      // );
      initialEditorState = EditorState.createWithContent(
        convertFromRaw(DEFAULT_CONTENT_STATE_RAW)
      );
    } else {
      const contentState = convertFromRaw(contentStateRaw);
      initialEditorState = EditorState.createWithContent(contentState);
    }

    _setEditorState(initialEditorState);
  }, []);

  function setEditorState(editorState) {
    _setEditorState(editorState);

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
