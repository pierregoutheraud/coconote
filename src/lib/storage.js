class Storage {
  get(keys) {
    return new Promise(resolve => {
      chrome.storage.sync.get(keys, function(result) {
        resolve(result);
      });
    });
  }

  set(data) {
    return new Promise(resolve => {
      chrome.storage.sync.set(data, function() {
        resolve();
      });
    });
  }
}

export default new Storage();
