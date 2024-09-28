import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as signOut_,
} from "firebase/auth";
import { app } from "./app";

export const auth = getAuth(app);

export const signIn = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const signOut = () => {
  return signOut_(auth);
};
