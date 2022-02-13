// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
  limit,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0aoZ5EYGZgPq8T5q4vJBK51LFiLuB5X0",
  authDomain: "myubereats.firebaseapp.com",
  projectId: "myubereats",
  storageBucket: "myubereats.appspot.com",
  messagingSenderId: "947340145299",
  appId: "1:947340145299:web:9c27bf80ad0a9aef465366",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const orderCollection = collection(db, "orders");

export const addOrders = async (items, restaurantName) => {
  await addDoc(orderCollection, {
    items: items,
    restaurantName: restaurantName,
    createdAt: serverTimestamp(),
  });
};

export const getOrder = async (setLastOrder) => {
  const q = query(orderCollection, orderBy("createdAt", "desc"), limit(1));
  onSnapshot(q, (snapshot) => {
    snapshot.docs.map((doc) => {
      setLastOrder(doc.data());
    });
  });
};
