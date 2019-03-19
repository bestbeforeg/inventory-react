import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD37jMrNC-k4gBCvMZ3inweCYU7ot3K7JY",
  authDomain: "inventory-db-c2098.firebaseapp.com",
  databaseURL: "https://inventory-db-c2098.firebaseio.com",
  projectId: "inventory-db-c2098",
  storageBucket: "inventory-db-c2098.appspot.com",
  messagingSenderId: "778754583766"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;