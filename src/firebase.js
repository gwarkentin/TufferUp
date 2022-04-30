import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyAoj6rnaTbi3OSa-k9Tck6RU-LG15NxZCU",
  authDomain: "tufferup-a6ac1.firebaseapp.com",
  projectId: "tufferup-a6ac1",
  storageBucket: "tufferup-a6ac1.appspot.com",
  messagingSenderId: "649046470013",
  appId: "1:649046470013:web:0ecfd72c298ed91135b014"
};
const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)
getToken(messaging, {vapidKey:'BBy0LQCgVHcRRf3jCddnPAdWRMQplq0eAZxxRYBd1ElGtKsqDzwA9O4ZaZmw34vq5T-w4eLEEnNETjHAyvB21jg'})

export const firebaseMessaging = messaging