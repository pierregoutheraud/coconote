import { createStore } from "easy-peasy";
// import storage from "../lib/storage";
import model from "./model";
import saveMiddleware from "./saveMiddleware";

export default function() {
  // const persistedState = await storage.loadState();
  // const store = createStore(model, {
  //   initialState: persistedState,
  // });

  const store = createStore(model, {
    middleware: [saveMiddleware],
  });

  // We load font from store
  // store.dispatch.settings.setFont(store.getState().settings.font);

  // store.subscribe(async () => {
  //   await storage.saveState(store.getState());
  // });

  return store;
}
