import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDfjlg_298I03jMG3pmziOCd3qb_nOxx_M",
    authDomain: "te91-inventory-app.firebaseapp.com",
    databaseURL: "https://te91-inventory-app.firebaseio.com",
    projectId: "te91-inventory-app",
    storageBucket: "te91-inventory-app.appspot.com",
    messagingSenderId: "882868396058"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;