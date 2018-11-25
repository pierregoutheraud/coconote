import React from "react";
import { useStore } from "easy-peasy";
import { RichUtils } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import cx from "classnames";

import userEditorState from "../../hooks/useEditorState";
import "draft-js/dist/Draft.css";
// import "draft-js-linkify-plugin/lib/plugin.css";
import styles from "./Editor.css";

const linkifyPlugin = createLinkifyPlugin({
  target: "_blank",
  component: props => (
    <a {...props} onClick={() => window.open(props.href, "_blank")} />
  ),
});

export default function MyEditor() {
  const [editorState, setEditorState] = userEditorState();
  const font = useStore(state => state.settings.font);
  const fontSize = useStore(state => state.settings.fontSize);
  const nightmode = useStore(state => state.settings.nightmode);

  if (editorState === null) {
    return null;
  }

  function onChange(e) {
    setEditorState(e);
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
    <div
      style={fontStyle}
      className={cx(styles.container, {
        [styles.nightmode]: nightmode,
      })}
    >
      <Editor
        editorState={editorState}
        customStyleMap={styleMap}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        plugins={[linkifyPlugin]}
      />
    </div>
  );
}
