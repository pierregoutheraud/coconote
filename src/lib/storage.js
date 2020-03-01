import LZString from "lz-string";
// Allows to store large object in chrome.storage.sync, by compressing and splitting in different keys
// import "chrome-storage-largesync/dist/chrome-Storage-largeSync.min.js";

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
  get(keys = null) {
    return new Promise(resolve => {
      chrome.storage.sync.get(keys, function(result) {
        resolve(result);
      });
    });
  }

  set(obj) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set(obj, function() {
        if (chrome.runtime.lastError) {
          consoleh.error(chrome.runtime.lastError.message);
          reject(chrome.runtime.lastError);
        }
        resolve();
      });
    });
  }

  clear() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.clear(function() {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          reject(chrome.runtime.lastError);
        }
        resolve();
      });
    });
  }

  decompressObject(obj) {
    let str = "";
    for (let key in obj) {
      str += obj[key].newValue || obj[key]; // to be able to decompress changes object as well
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

    /*
    const obj = {
      ...result,
      notes: this.decompressObject(result.notes),
    };
    */

    const obj = this.decompressObject(result);
    // console.log("loadState", obj);
    return obj;
  }

  async saveState(state) {
    /*
    const { notes, ...rest } = state;
    const obj = {
      ...rest,
      notes: this.compressObject(notes),
    };
    */

    const obj = this.compressObject(state);
    // await this.clear();
    console.log("saveState", obj);
    // console.log("saveState", obj);
    await this.set(obj);
  }
}

export default new Storage();
