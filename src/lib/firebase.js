import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

var config = {
  apiKey: "AIzaSyBj6H3hpOsWEkuhlmU9bjBPz-t-FHrFibs",
  authDomain: "coconote-60642.firebaseapp.com",
  databaseURL: "https://coconote-60642.firebaseio.com",
  projectId: "coconote-60642",
  storageBucket: "coconote-60642.appspot.com",
  messagingSenderId: "389374090163",
};
firebase.initializeApp(config);

export const db = firebase.firestore();
export const rdb = firebase.database();
export const auth = firebase.auth();

export function getUser() {
  const { currentUser } = auth;
  if (!currentUser) {
    throw new Error("user === null");
  }
  return currentUser;
}

export function getUserId() {
  const user = getUser();
  if (!user) {
    throw new Error("user === null");
  }
  return user.uid;
}

function login() {
  return new Promise(resolve => {
    const interactive = true;
    chrome.identity.getAuthToken({ interactive: !!interactive }, function(
      token
    ) {
      if (chrome.runtime.lastError && !interactive) {
        console.log("It was not possible to get a token programmatically.");
      } else if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else if (token) {
        // Authorize Firebase with the OAuth Access Token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          null,
          token
        );
        resolve(
          firebase
            .auth()
            .signInWithCredential(credential)
            .catch(function(error) {
              // The OAuth token might have been invalidated. Lets' remove it from cache.
              if (error.code === "auth/invalid-credential") {
                chrome.identity.removeCachedAuthToken(
                  { token: token },
                  function() {
                    startAuth(interactive);
                  }
                );
              }
            })
        );
      } else {
        console.error("The OAuth Token was null");
      }
    });
  });
}

export function checkAuth() {
  return new Promise(resolve => {
    const unsub = auth.onAuthStateChanged(function(user) {
      unsub();
      if (user) {
        resolve(user);
      } else {
        resolve(login());
      }
    });
  });
}
