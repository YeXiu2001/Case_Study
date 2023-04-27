// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJuEuDo9UGowUco3f6DqJD3zd_tYisqYU",
  authDomain: "testcase-190aa.firebaseapp.com",
  projectId: "testcase-190aa",
  storageBucket: "testcase-190aa.appspot.com",
  messagingSenderId: "506854141828",
  appId: "1:506854141828:web:25c7af13baaaaa389237d1",
  measurementId: "G-T2TEST4KR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(app)