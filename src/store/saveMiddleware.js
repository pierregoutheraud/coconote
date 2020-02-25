import storage from "../lib/storage";

export default store => next => action => {
  console.log(action);

  const result = next(action);

  // Save state to firebase
  if (action.type !== "@action.initState") {
    storage.saveState(store.getState());
  }

  return result;
};
