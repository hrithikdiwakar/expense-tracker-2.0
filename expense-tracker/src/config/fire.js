  
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAtwp36C5MFCoznBhzvG5RlxohOhAwQOPg",
    authDomain: "expense-tracker-65043.firebaseapp.com",
    projectId: "expense-tracker-65043",
    storageBucket: "expense-tracker-65043.appspot.com",
    messagingSenderId: "959636865729",
    appId: "1:959636865729:web:8b47b84143c0abcdc90a40",
    measurementId: "G-C1QNNBTY2N"
};

const fire = firebase.initializeApp(config);
export default fire;