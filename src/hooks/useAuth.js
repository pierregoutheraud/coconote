import { useState, useEffect } from "react";
import { useActions } from "easy-peasy";
import storage from "../lib/storage";
import { auth, checkAuth, db, getUserId } from "../lib/firebase";
import { getTab } from "../lib/chrome";

let currentTabId;
getTab().then(tab => {
  currentTabId = tab.id;
});

let firstUpdate = true;
let unsub;
export default function useAuth() {
  const [logged, setLogged] = useState(false);
  // const userId = useStore(state => state.auth.userId);
  // const setUser = useActions(dispatch => dispatch.auth.setUser);
  const initState = useActions(dispatch => dispatch.initState);

  // function onUpdate(state) {
  //   chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
  //     if (tabId !== tabs[0].id) {
  //       render(true);
  //     }
  //   });
  // }

  async function getUser() {
    const user = await checkAuth();

    const state = await storage.loadState();
    if (state) {
      initState(state);
    }

    setLogged(true);

    if (unsub) {
      unsub();
    }
    unsub = db
      .collection("states")
      .doc(getUserId())
      .onSnapshot(function(doc) {
        if (doc.exists) {
          // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          const obj = doc.data();

          // Coming from other tab
          const source = `chrome${currentTabId}`;

          console.log(obj.source, source);

          if (!firstUpdate && obj.source !== source) {
            initState(obj);
            // window.location.reload(false);
          }
        }

        firstUpdate = false;
      });
  }

  useEffect(() => {
    getUser();
  }, []);

  return logged;
}
