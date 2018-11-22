import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider, createStore } from "easy-peasy";
import model from "./store/model";
import App from "./App";
import storage from "./lib/storage";
import "./index.css";

async function render() {
  const persistedState = await storage.loadState();

  const store = createStore(model, {
    initialState: persistedState,
    devTools: true,
  });

  // We load font from store
  store.dispatch.settings.setFont(store.getState().settings.font);

  store.subscribe(async () => {
    await storage.saveState(store.getState());
  });

  ReactDOM.render(
    <StoreProvider store={store}>
      <App />
    </StoreProvider>,
    document.querySelector("#root")
  );
}

render();
