import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "easy-peasy";
import App from "./App";
import configureStore from "./store/configureStore";
import storage from "./lib/storage";
import "./index.css";

if (module.hot) {
  module.hot.dispose(function() {
    // module is about to be replaced
    chrome.storage.onChanged.removeListener(handleChanged);
  });
  module.hot.accept(function() {
    // module or one of its dependencies was just updated
  });
}

let timeout = null;
let tabId = null;

function handleChanged(changes, namespace) {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    /*
    // In case we do not use from: tabId_Date.now()
    // we load whole state from google
    storage.loadState().then(newState => {
      if (newState.from !== tabId) {
        console.log("RENDER");
        render(true);
      }
    });
    */

    const changesObj = storage.decompressObject(changes);
    if (changesObj.from) {
      const fromTabId = parseInt(changesObj.from.split("_")[0]);
      if (fromTabId !== tabId) {
        render(true);
      }
    }
  }, 300);
}

async function render(force) {
  console.log("render()");

  tabId = await getCurrentTabId();

  const store = await configureStore(tabId);

  const div = document.querySelector("#root");

  if (force) {
    ReactDOM.render(null, div);
  }

  ReactDOM.render(
    <StoreProvider store={store}>
      <App />
    </StoreProvider>,
    div
  );

  // Re-render in case we are not the focused tab and we received new data from chrome.storage
  chrome.storage.onChanged.removeListener(handleChanged);
  chrome.storage.onChanged.addListener(handleChanged);
}

render();

function getCurrentTabId() {
  return new Promise(resolve => {
    chrome.tabs.getCurrent(tab => {
      resolve(tab.id);
    });
  });
}
