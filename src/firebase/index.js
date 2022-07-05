import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnBE_fgeiz1GnmW7YxHq5sI2YD_MlYgoc",
  authDomain: "ecommerce-c0adb.firebaseapp.com",
  projectId: "ecommerce-c0adb",
  storageBucket: "ecommerce-c0adb.appspot.com",
  messagingSenderId: "710419082453",
  appId: "1:710419082453:web:5e0d47d396b0cdb129465c",
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export const uploadImage = (file) => {
  return new Promise((resolve, eject) => {
    const uploadProcess = storage
      .ref(`images/${file.name}-${file.lastModified}`)
      .put(file);

    uploadProcess.on(
      "state_changed",
      (snapshot) => console.log("la imagen se esta subiendo", snapshot),
      eject,
      () => {
        console.log("enter", file);
        storage
          .ref("images")
          .child(`${file.name}-${file.lastModified}`)
          .getDownloadURL()
          .then(resolve);
      }
    );
  });
};
