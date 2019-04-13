import React from "react";
import { useStore, useActions } from "easy-peasy";
import { RichUtils } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import cx from "classnames";

import useNote from "../../hooks/useNote";
import "draft-js/dist/Draft.css";
import EditorToolbar from "../EditorToolbar/EditorToolbar";
// import "draft-js-linkify-plugin/lib/plugin.css";
import styles from "./Editor.css";

const linkifyPlugin = createLinkifyPlugin({
  target: "_blank",
  component: props => (
    <a {...props} onClick={() => window.open(props.href, "_blank")} />
  ),
});

export default function MyEditor() {
  const [editorState, setEditorState] = useNote();
  const font = useStore(state => state.settings.font);
  const fontSize = useStore(state => state.settings.fontSize);
  const nightmode = useStore(state => state.settings.nightmode);
  const listOpen = useStore(state => state.notes.listOpen);
  const closeList = useActions(dispatch => dispatch.notes.closeList);

  function onChange(newEditorState) {
    setEditorState(newEditorState);
  }

  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  function handleFocus() {
    if (listOpen) {
      closeList();
    }
  }

  function blockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === "header-one") {
      return styles.title;
    }
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
    <div
      style={fontStyle}
      className={cx(styles.container, {
        [styles.nightmode]: nightmode,
      })}
    >
      <EditorToolbar editorState={editorState} onChange={onChange} />
      {editorState !== null && (
        <Editor
          editorState={editorState}
          customStyleMap={styleMap}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          onFocus={handleFocus}
          plugins={[linkifyPlugin]}
          blockStyleFn={blockStyleFn}
        />
      )}
    </div>
  );
}
