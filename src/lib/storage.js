import LZString from "lz-string";
// Allows to store large object in chrome.storage.sync, by compressing and splitting in different keys
// import "chrome-storage-largesync/dist/chrome-Storage-largeSync.min.js";

// Not from chrome.storage.sync.QUOTA_BYTES_PER_ITEM for firefox where its undefined
const QUOTA_BYTES_PER_ITEM = 8192;

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

  async loadState() {
    const result = await this.get();
    let str = "";
    for (let key in result) {
      str += result[key];
    }
    str = LZString.decompressFromBase64(str);
    const state = JSON.parse(str);
    return state;
  }

  async saveState(state) {
    let str = JSON.stringify(state);
    str = LZString.compressToBase64(str);
    let arr = str.split("");

    let totalBytesUsed = 0;
    const obj = {};
    let i = 0;
    while (arr.length) {
      const key = "STATE_" + i;
      const segment = arr.splice(
        0,
        QUOTA_BYTES_PER_ITEM - key.length - 2 // we deduct key.length and two "
      );
      obj[key] = segment.join("");
      totalBytesUsed += obj[key].length + key.length + 2;
      i++;
    }

    await this.clear();
    await this.set(obj);
  }
}

export default new Storage();
