/*import firebase from 'firebase';

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3kuDcqde5cZpa6vWGbKFRhcWujv9K2EQ",
  authDomain: "miniproject-class.firebaseapp.com",
  projectId: "miniproject-class",
  storageBucket: "miniproject-class.appspot.com",
  messagingSenderId: "418785017218",
  appId: "1:418785017218:web:d49705a4b0c79d7559a39b"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);

export default fire;*/

import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyB3kuDcqde5cZpa6vWGbKFRhcWujv9K2EQ",
  authDomain: "miniproject-class.firebaseapp.com",
  projectId: "miniproject-class",
  storageBucket: "miniproject-class.appspot.com",
  messagingSenderId: "418785017218",
  appId: "1:418785017218:web:d49705a4b0c79d7559a39b"
};

const fire= firebase.initializeApp(firebaseConfig);

export default fire;
