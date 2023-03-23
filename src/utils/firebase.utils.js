import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  enableNetwork,
  disableNetwork,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBONJhvs-ONw62295U9F9xUsU1dK0DnRMg",
  authDomain: "futurex-398b7.firebaseapp.com",
  projectId: "futurex-398b7",
  storageBucket: "futurex-398b7.appspot.com",
  messagingSenderId: "16203005894",
  appId: "1:16203005894:web:a2f0880a0585231dce3cc7",
};

const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
const db = getFirestore(app);
export let email = "";
export const signInWithGooglePopup = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await enableNetwork(db);
    email = result.user.email;
    return { credential: result.credential, email: email };
  } catch (error) {
    console.log(error);
  }
};

export const signOutUser = async () => {
  await signOut(auth);
  // Disable network access to prevent data persistence
  await disableNetwork(db);
};

export const saveUserData = async (rows) => {
  try {
    await setDoc(doc(db, "users", email), {
      rows: rows,
    });
    console.log("Document written with ID:", email);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getUserData = async (email) => {
  try {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data().rows[0]);
    if (docSnap.exists()) {
      return docSnap.data().rows;
    } else {
      console.log("No such document exists!");
      return null;
    }
  } catch (e) {
    console.error("Error retrieving document: ", e);
    return null;
  }
};
