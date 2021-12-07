import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDVmK1AzOrZEq__eGHQ0KaGIRvUXze6WE4",
  authDomain: "smartfysaques.firebaseapp.com",
  databaseURL: "https://smartfysaques-default-rtdb.firebaseio.com",
  projectId: "smartfysaques",
  storageBucket: "smartfysaques.appspot.com",
  messagingSenderId: "139942571124",
  appId: "1:139942571124:web:b99e25e45efda51975b521"
};

export const firebase = initializeApp(firebaseConfig);
export const database = getDatabase(firebase);


