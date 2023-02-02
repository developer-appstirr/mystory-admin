import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCqQlWfqNTRhLe4QcM_C_4vSjTnhvUc2-M",
//   authDomain: "mystory-app-9a032.firebaseapp.com",
//   databaseURL: "https://mystory-app-9a032-default-rtdb.firebaseio.com",
//   projectId: "mystory-app-9a032",
//   storageBucket: "mystory-app-9a032.appspot.com",
//   messagingSenderId: "321686595944",
//   appId: "1:321686595944:web:e499a39a8d56966cafcedd",
//   measurementId: "G-BMTQ4M1S2M",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCqQlWfqNTRhLe4QcM_C_4vSjTnhvUc2-M",
  authDomain: "mystory-app-9a032.firebaseapp.com",
  databaseURL: "https://mystory-app-9a032-default-rtdb.firebaseio.com",
  projectId: "mystory-app-9a032",
  storageBucket: "mystory-app-9a032.appspot.com",
  messagingSenderId: "321686595944",
  appId: "1:321686595944:web:e499a39a8d56966cafcedd",
  measurementId: "G-BMTQ4M1S2M",
};

// const storage = firebase.storage();

// export { storage, firebase as default };

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const auth = getAuth(app);

export const db = getFirestore(app);
