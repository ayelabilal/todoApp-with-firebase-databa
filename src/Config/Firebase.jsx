import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBoW-gLUOrExrBA9P7-YZWZUjNrFsgviO0",
    authDomain: "todo-app-wth-firebase-database.firebaseapp.com",
    projectId: "todo-app-wth-firebase-database",
    storageBucket: "todo-app-wth-firebase-database.appspot.com",
    messagingSenderId: "72993749279",
    appId: "1:72993749279:web:6c1c65d542c237e13c982a"
  };


  const app = initializeApp(firebaseConfig);

  const database = getFirestore(app);

  const auth = getAuth(app);

  export {database,auth};