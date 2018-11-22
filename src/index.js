import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider, createStore } from "easy-peasy";
import model from "./store/model";
import App from "./App";
import storage from "./lib/storage";
import "./index.css";

async function render() {
  let persistedState = undefined;
  const result = await storage.get(["state"]);
  if ("state" in result) {
    persistedState = result.state;
  }

  const store = createStore(model, {
    initialState: persistedState,
  });

  // We load font from store
  store.dispatch.settings.setFont(store.getState().settings.font);

  store.subscribe(async () => {
    console.log("save state", store.getState());
    await storage.set("state", store.getState());
  });

  ReactDOM.render(
    <StoreProvider store={store}>
      <App />
    </StoreProvider>,
    document.querySelector("#root")
  );
}

render();
