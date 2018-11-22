class Storage {
  get(keys) {
    return new Promise(resolve => {
      chrome.storage.sync.get(keys, function(result) {
        resolve(result);
      });
    });
  }

  set(key, value) {
    return new Promise(resolve => {
      chrome.storage.sync.set({ [key]: value }, function() {
        resolve();
      });
    });
  }
}

export default new Storage();
