import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  startAfter,
  updateDoc,
  where,
  type DocumentData,
} from "firebase/firestore";
import { app } from "./app";
import { ERROR, TASK, TASKRESULT } from "@/constant";
import type { UTask } from "@/types/task";
import type { UDocument } from "@/types/firebase";

export const db = getFirestore(app);

export const getTasks = () => {
  const colRef = collection(db, TASK);
  const queryRef = query(colRef, orderBy("timestamp", "desc"));
  return getDocs(queryRef);
};

export const addTask = (task: UDocument<UTask>) => {
  const colRef = collection(db, TASK);
  return addDoc(colRef, task);
};

export const updateTask = (id: string, task: object) => {
  const colRef = doc(db, TASK, id);
  return updateDoc(colRef, task);
};

export const removeTask = (id: string) => {
  const docRef = doc(db, TASK, id);
  return deleteDoc(docRef);
};

export const getResults = () => {
  const colRef = collection(db, TASKRESULT);
  const queryRef = query(colRef, orderBy("timestamp", "desc"));
  return getDocs(queryRef);
};

export const listenTasks = (
  callback: (snapshot: QuerySnapshot<DocumentData, DocumentData>) => void
) => {
  const colRef = collection(db, TASK);
  const queryRef = query(
    colRef,
    orderBy("timestamp", "asc"),
    startAfter(Date.now())
  );
  return onSnapshot(queryRef, callback);
};
export const listenResult = (
  callback: (snapshot: QuerySnapshot<DocumentData, DocumentData>) => void
) => {
  const colRef = collection(db, TASKRESULT);
  const queryRef = query(
    colRef,
    orderBy("timestamp", "asc"),
    startAfter(Date.now())
  );
  return onSnapshot(queryRef, callback);
};

export const removeResult = (id: string) => {
  const docRef = doc(db, TASKRESULT, id);
  return deleteDoc(docRef);
};

export const getErrors = () => {
  const colRef = collection(db, ERROR);
  const queryRef = query(colRef, orderBy("timestamp", "desc"));
  return getDocs(queryRef);
};
export const removeError = (id: string) => {
  const docRef = doc(db, ERROR, id);
  return deleteDoc(docRef);
};
