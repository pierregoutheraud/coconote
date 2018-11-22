import {
  ContentState,
  EditorState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";

const KEY_STATE = "STATE";

const KEY_EDITOR = "EDITOR_STATE_RAW";
const KEY_EDITOR_REST = KEY_EDITOR + "_REST";
const KEY_EDITOR_BLOCKS_LENGTH = KEY_EDITOR + "_BLOCKS_LENGTH";
const KEY_EDITOR_BLOCK = KEY_EDITOR + "_BLOCK_";

class Storage {
  get(keys) {
    return new Promise(resolve => {
      chrome.storage.sync.get(keys, function(result) {
        resolve(result);
      });
    });
  }

  set(obj) {
    return new Promise(resolve => {
      chrome.storage.sync.set(obj, function() {
        resolve();
      });
    });
  }

  async loadState() {
    // First we check if we have a state in chrome storage
    const res1 = await this.get([KEY_EDITOR_BLOCKS_LENGTH]);
    if (!(KEY_EDITOR_BLOCKS_LENGTH in res1)) {
      return undefined;
    }

    // We fetch the number of lines saved in editor
    const blocksLength = res1[KEY_EDITOR_BLOCKS_LENGTH];

    // Create array of keys that we are going to get from chrome.storage
    const keys = [...Array(blocksLength)].reduce(
      (acc, curr, i) => {
        acc.push(KEY_EDITOR_BLOCK + i);
        return acc;
      },
      [KEY_STATE, KEY_EDITOR_REST]
    );

    const res2 = await this.get(keys);

    // Reconstruct contentStateRaw and global state
    const blocks = [...Array(blocksLength)].map(
      (v, i) => res2[KEY_EDITOR_BLOCK + i]
    );
    const rest = res2[KEY_EDITOR_REST];
    const contentStateRaw = { blocks, ...rest };

    let state = {
      ...(res2[KEY_STATE] || {}),
      editor: {
        contentStateRaw,
      },
    };

    return state;
  }

  async saveState(state) {
    // Save everything except editor
    const { editor, ...restOfState } = state;
    let data = { [KEY_STATE]: restOfState };

    // We need to split up contentStateRaw into multiple indexes
    const { blocks, ...restOfEditor } = editor.contentStateRaw;

    // First save ...rest
    data[KEY_EDITOR_REST] = restOfEditor;

    // Then one key for each blocks
    data[KEY_EDITOR_BLOCKS_LENGTH] = blocks.length;
    blocks.forEach((block, i) => {
      data[KEY_EDITOR_BLOCK + i] = block;
    });

    await this.set(data);
    // console.log("saveState", data);
  }
}

export default new Storage();
