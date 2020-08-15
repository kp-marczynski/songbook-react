import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBFQQQbdU8hkYLRpjTfG23mwTWQR4ohQdo",
    authDomain: "kpmarczynski-songbook.firebaseapp.com",
    databaseURL: "https://kpmarczynski-songbook.firebaseio.com",
    projectId: "kpmarczynski-songbook",
    storageBucket: "kpmarczynski-songbook.appspot.com",
    messagingSenderId: "788431446293",
    appId: "1:788431446293:web:5cdd044b348d854c86891c",
    measurementId: "G-WSR9X4ZD7Y"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export let user: any;
auth.onAuthStateChanged(authState => console.log(authState?.uid))
export const signInWithGoogle = () => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    .then(res => console.log('Successfully logged in!' + JSON.stringify(res)))
    .catch(error => console.log(error));
export const signOut = () => auth.signOut();
export const signInAnonymously = () => auth.signInAnonymously().then()
export const firestore = firebase.firestore();
