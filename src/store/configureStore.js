import { createStore } from "easy-peasy";
import storage from "../lib/storage";
import model from "./model";

let store = null;
export default async function() {
  const persistedState = await storage.loadState();

  store = createStore(model, {
    initialState: persistedState,
  });

  // We load font from store
  store.dispatch.settings.setFont(store.getState().settings.font);

  store.subscribe(async () => {
    await storage.saveState(store.getState());
  });

  return store;
}

export function getStore() {
  return store;
}
