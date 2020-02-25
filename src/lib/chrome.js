export function getTab() {
  return new Promise(resolve => {
    chrome.tabs.getCurrent(tab => {
      resolve(tab);
    });
  });
}
