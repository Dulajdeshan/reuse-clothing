import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyAzVDfyew1bvDt9tr0RfBaCxufbIjg8E68',
  authDomain: 'reuse-clothing.firebaseapp.com',
  projectId: 'reuse-clothing',
  storageBucket: 'reuse-clothing.appspot.com',
  messagingSenderId: '1075321343582',
  appId: '1:1075321343582:web:01ec26a0031629b940aecf',
  measurementId: 'G-LLVS1DWKT8',
};
firebase.initializeApp(config);

const { auth, firestore } = firebase;

export { firebase, auth, firestore };
