import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "easy-peasy";
import App from "./App";
import configureStore from "./store/configureStore";
import { db } from "./lib/firebase";
import { getTab } from "./lib/chrome";
import "./index.css";

async function render(force) {
  const store = configureStore();

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

/*
let unsub = undefined;
getTab().then(tab => {
  if (unsub) {
    unsub();
  }
  unsub = db
    .collection("states")
    .doc(user.uid)
    .onSnapshot(function(doc) {
      if (doc.exists) {
        // onUpdate(doc.data())
        // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        // console.log(source);
        // if (source === "Server") {
        //   const obj = doc.data();
        //   const state = storage.decompressObject(obj);
        //   // const state = obj;
        //   initState(state);
        // }
      }
      setLogged(true);
    });
});
*/

/*
// Re-render in case we are not the focused tab and we received new data from chrome.storage
function onStateUpdate() {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
    // If we are not the focused tab
    if (tabId !== tabs[0].id) {
      render(true);
    }
  });
}
*/

/*
chrome.tabs.getCurrent(tab => {
  tabId = tab.id;
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    // Throttle here because of storage.clear() + storage.set() next to each other in storage.js
    clearTimeout(timeout);
    timeout = setTimeout(onStateUpdate, 300);
  });
});
*/

render();
