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

// Re-render in case we are not the focused tab and we received new data from chrome.storage
let tabId;
chrome.tabs.getCurrent(tab => {
  tabId = tab.id;
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(
      tabs
    ) {
      // If we are not the focused tab
      if (tabId !== tabs[0].id) {
        render(true);
      }
    });
  });
});

render();
