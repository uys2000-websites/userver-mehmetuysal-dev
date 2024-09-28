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
import { ACTION, ERROR, TASK, TASKRESULT } from "@/constant";
import type { UAction, UTask, UTaskType } from "@/types/task";
import type { UDocument } from "@/types/firebase";

export const db = getFirestore(app);

export const getTask = (id: string) => {
  const docRef = doc(db, TASK, id);
  return getDoc(docRef);
};

export const updateTask = (id: string, active = true) => {
  const docRef = doc(db, TASK, id);
  return updateDoc(docRef, { utimestamp: Date.now(), active: active });
};

export const updateCronTask = (id: string, cronStatus: boolean) => {
  const docRef = doc(db, TASK, id);
  return updateDoc(docRef, {
    utimestamp: Date.now(),
    active: true,
    "data.cronStatus": cronStatus,
  });
};

export const addTask = (task: UDocument<UTask>) => {
  const colRef = collection(db, TASK);
  return addDoc(colRef, task);
};

export const getTasks = (type: UTaskType) => {
  const colRef = collection(db, TASK);
  const queryRef = query(
    colRef,
    where("data.type", "==", type),
    orderBy("timestamp", "desc")
  );
  return getDocs(queryRef);
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

export const addAction = (item: UDocument<UAction>) => {
  const colRef = collection(db, ACTION);
  return addDoc(colRef, item);
};
