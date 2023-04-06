import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDs9MntF5n5aL8WZMSMKyPCuEbl1wF0z94",
  authDomain: "mahjongsoul-3fdd4.firebaseapp.com",
  projectId: "mahjongsoul-3fdd4",
  storageBucket: "mahjongsoul-3fdd4.appspot.com",
  messagingSenderId: "818055228202",
  appId: "1:818055228202:web:ae71a027bd7df6f7744c53"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db
