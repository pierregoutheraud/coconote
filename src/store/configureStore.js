import { createStore, compose } from "easy-peasy";
import storage from "../lib/storage";
import model from "./model";
import saveMiddleware from "./saveMiddleware";
import { loadFont } from "../lib/utils";

/*
let timeout;
let tabId;
function handleChanged(changes, namespace) {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    if (changes.from.newValue && changes.from.newValue !== tabId) {
      storage.loadState().then(googleState => {
        store.dispatch.updateState(googleState);
      });
    }
  }, 300);
}
*/

let store = null;
export default async function(_tabId) {
  // tabId = _tabId;

  const persistedState = await storage.loadState();
  const initialState = {
    ...persistedState,
    tabId: _tabId,
  };

  // console.log("initialState", initialState);

  store = createStore(model, {
    initialState,
    middleware: [saveMiddleware],
  });

  // Load font the first time
  loadFont(store.getState().settings.font);

  // THIS DOES NOT WORK, SINCE EDITOR STATE IS NOT UPDATED
  // Re-render in case we are not the focused tab and we received new data from chrome.storage
  // chrome.storage.onChanged.removeListener(handleChanged);
  // chrome.storage.onChanged.addListener(handleChanged);

  return store;
}

export function getStore() {
  return store;
}
