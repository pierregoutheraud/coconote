import { useState, useEffect } from "react";
import {
  ContentState,
  EditorState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import { DEFAULT_TEXT } from "../constants/constants";
import storage from "../lib/storage";

const KEY = "EDITOR_STATE_KEY";
const KEY_REST = KEY + "_REST";
const KEY_BLOCKS_LENGTH = KEY + "_BLOCKS_LENGTH";
const KEY_BLOCK = KEY + "_BLOCK_";

// Save editor state to chrome storage
// We have to split data like this because there is a limit on one key
// TODO: More generic way to save json to chrome storage and split it
function saveEditorStateToStorage(editorState) {
  const contentState = editorState.getCurrentContent();
  const json = convertToRaw(contentState);
  const { blocks, ...rest } = json;

  // First save ...rest
  let data = {
    [KEY_REST]: { ...rest },
  };

  // Then one key for each blocks
  data[KEY_BLOCKS_LENGTH] = blocks.length;
  blocks.forEach((block, i) => {
    data[KEY_BLOCK + i] = block;
  });

  chrome.storage.sync.set(data, () => {
    // console.log("data saved", data);
  });
}

// Retrieve editor state from chrome
async function getEditorStateFromStorage(blocksLength) {
  const keys = [...Array(blocksLength)].reduce(
    (acc, curr, i) => {
      acc.push(KEY_BLOCK + i);
      return acc;
    },
    [KEY_REST]
  );

  const result = await storage.get(keys);
  const blocks = [...Array(blocksLength)].map((v, i) => result[KEY_BLOCK + i]);
  const rest = result[KEY_REST];
  const json = { blocks, ...rest };
  const contentState = convertFromRaw(json);
  return EditorState.createWithContent(contentState);
}

let timeout = null;

export default function useEditorState() {
  const [editorState, _setEditorState] = useState(null);

  function setEditorState(editorState, save = true) {
    _setEditorState(editorState);
    if (!save) {
      return;
    }

    // Save contentState to local storage
    clearTimeout(timeout);
    timeout = setTimeout(() => saveEditorStateToStorage(editorState), 300);
  }

  useEffect(() => {
    // window.chrome.storage.sync.remove([KEY_BLOCKS_LENGTH]);
    chrome.storage.sync.get([KEY_BLOCKS_LENGTH], function(result) {
      let editorState;
      if (!(KEY_BLOCKS_LENGTH in result)) {
        // editorState = EditorState.createEmpty();
        editorState = EditorState.createWithContent(
          ContentState.createFromText(DEFAULT_TEXT)
        );
        setEditorState(editorState, false);
      } else {
        getEditorStateFromStorage(result[KEY_BLOCKS_LENGTH]).then(
          editorState => {
            setEditorState(editorState, false);
          }
        );
      }
    });
  }, []);

  return [editorState, setEditorState];
}
