import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "easy-peasy";
import App from "./App";
import configureStore from "./store/configureStore";
import "./index.css";
import "./popup.css";

if (module.hot) {
  module.hot.accept();
}

async function render(force) {
  const store = await configureStore("popup");
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

render();
