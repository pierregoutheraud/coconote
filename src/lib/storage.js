import LZString from "lz-string";
import { db, getUserId } from "../lib/firebase";
import { getTab } from "./chrome";

// Not from chrome.storage.sync.QUOTA_BYTES_PER_ITEM for firefox where its undefined
const QUOTA_BYTES_PER_ITEM = 8192;

/* Save from console
with ({ copy }) {
  chrome.storage.sync.get(null, function(result) {
    copy(result);
  });
}
*/

class Storage {
  async get() {
    const stateDoc = await db
      .collection("states")
      .doc(getUserId())
      .get();

    if (!stateDoc.exists) {
      return null;
    }

    return stateDoc.data();
  }

  async set(obj) {
    const tab = await getTab();
    return db
      .collection("states")
      .doc(getUserId())
      .set({
        source: `chrome${tab.id}`,
        ...obj,
      });
  }

  decompressObject(obj) {
    let str = "";
    for (let key in obj) {
      str += obj[key];
    }
    str = LZString.decompressFromBase64(str);
    return JSON.parse(str);
  }

  compressObject(obj) {
    let str = JSON.stringify(obj);
    str = LZString.compressToBase64(str);
    let arr = str.split("");
    const newObj = {};

    // let totalBytesUsed = 0;
    let i = 0;
    while (arr.length) {
      const key = "STATE_" + i;
      const segment = arr.splice(
        0,
        QUOTA_BYTES_PER_ITEM - key.length - 2 // we deduct key.length and two "
      );
      newObj[key] = segment.join("");
      // totalBytesUsed += newObj[key].length + key.length + 2;
      i++;
    }

    return newObj;
  }

  async loadState() {
    const result = await this.get();
    if (!result) {
      return null;
    }
    return result;
    // return this.decompressObject(result);
  }

  async saveState(state) {
    const whitelist = ["settings", "notes"];
    const obj = whitelist.reduce((acc, curr) => {
      acc[curr] = state[curr];
      return acc;
    }, {});
    // const obj = this.compressObject(state);
    await this.set(obj);
  }
}

export default new Storage();
