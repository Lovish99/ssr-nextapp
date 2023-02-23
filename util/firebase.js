import firebase from "firebase/compat/app";
import "firebase/compat/database";
const firebaseConfig = {
  apiKey: "AIzaSyCLqwdeVX9IEr2e8Qu9P0Jd7F7haZ8aS6I",
  authDomain: "next-ssr-96b73.firebaseapp.com",
  projectId: "next-ssr-96b73",
  storageBucket: "next-ssr-96b73.appspot.com",
  messagingSenderId: "308698293851",
  appId: "1:308698293851:web:8914400e286a0c3adec17e",
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
