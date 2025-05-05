// auth.js
import { auth } from "./firebaseClient";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

// With Google
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user.uid;
    } catch (error) {
        console.error("Error signing in with Google", error);
        return null;
    }
};

export const signOutWithGoogle = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out", error);
    }
};

// Email/Password
export const signUpWithEmailAndPassword = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const signInWithEmailAndPassword = (email, password) => signInWithEmailAndPasswordFirebase(auth, email, password);