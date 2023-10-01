// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDUCWAFaHkDvhFvBVrJn_tYEZK9DQ33y6U',
  authDomain: 'ride-sharing-a33b1.firebaseapp.com',
  projectId: 'ride-sharing-a33b1',
  storageBucket: 'ride-sharing-a33b1.appspot.com',
  messagingSenderId: '1072757041136',
  appId: '1:1072757041136:web:40d86ccdd6755666dadf35',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;
