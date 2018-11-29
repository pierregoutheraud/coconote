import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "easy-peasy";
import App from "./App";
import configureStore from "./store/configureStore";
import "./index.css";

async function render(force) {
  const store = await configureStore();

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
}

let tabId;
let timeout;

// Re-render in case we are not the focused tab and we received new data from chrome.storage
function onStateUpdate() {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
    // If we are not the focused tab
    if (tabId !== tabs[0].id) {
      render(true);
    }
  });
}

chrome.tabs.getCurrent(tab => {
  tabId = tab.id;
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    // Throttle here because of storage.clear() + storage.set() next to each other in storage.js
    clearTimeout(timeout);
    timeout = setTimeout(onStateUpdate, 300);
  });
});

render();
