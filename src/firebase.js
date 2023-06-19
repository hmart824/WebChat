import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNWkkDLf5QdUg69juT4eUHdkuNYosoI1Y",
  authDomain: "whatsappclone-56f55.firebaseapp.com",
  projectId: "whatsappclone-56f55",
  storageBucket: "whatsappclone-56f55.appspot.com",
  messagingSenderId: "939002735724",
  appId: "1:939002735724:web:6ff62e9290afb45f63fc49",
  measurementId: "G-61SVDTR7NE"
};

  const app = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  const db = app.firestore();

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  export {auth, googleProvider};

  export default db;