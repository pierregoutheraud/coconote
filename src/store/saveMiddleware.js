import storage from "../lib/storage";

export default store => next => action => {
  // console.log("saveMiddleware", action);

  const result = next(action);

  // Save state to firebase
  // But not when action is updateState because it means we just updated from another source
  if (action.type !== "@action.updateState") {
    const { tabId, ...stateToSave } = store.getState();
    storage.saveState({
      ...stateToSave,
      // We include timestamp so that it changes everytime and we can check changes.from each time
      from: `${tabId}_${Date.now()}`,
    });
  }

  return result;
};
