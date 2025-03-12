import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, off, onDisconnect, serverTimestamp, set, get } from "firebase/database";

const firebaseConfig = {
  databaseURL: "https://gender-based-violence-9eb1a-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, onValue, off, onDisconnect, serverTimestamp, set, get };