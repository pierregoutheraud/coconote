import { rejects } from "assert";
// Allows to store large object in chrome.storage.sync, by compressing and splitting in different keys
import "chrome-storage-largesync/dist/chrome-Storage-largeSync.min.js";

class Storage {
  get(keys = null) {
    return new Promise(resolve => {
      chrome.storage.largeSync.get(keys, function(result) {
        resolve(result);
      });
    });
  }

  set(obj) {
    return new Promise(resolve => {
      chrome.storage.largeSync.set(obj, function() {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          rejects(chrome.runtime.lastError);
        }
        resolve();
      });
    });
  }

  clear() {
    return new Promise(resolve => {
      chrome.storage.sync.clear(function() {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          rejects(chrome.runtime.lastError);
        }
        resolve();
      });
    });
  }

  async loadState() {
    return await this.get();
  }

  async saveState(state) {
    // await this.clear(); // optional
    await this.set(state);
  }
}

export default new Storage();
