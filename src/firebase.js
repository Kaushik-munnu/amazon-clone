import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDAQpRtriXvbDpXGcjmkw0s0vblFiAip6E",
  authDomain: "my-project-74c58.firebaseapp.com",
  projectId: "my-project-74c58",
  storageBucket: "my-project-74c58.appspot.com",
  messagingSenderId: "554213858610",
  appId: "1:554213858610:web:ba2516536cf589ce58cb2b",
  measurementId: "G-1MSLDT5FRG"
};

  const firebaseApp =firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};