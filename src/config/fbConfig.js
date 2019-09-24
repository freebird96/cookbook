import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyCSzXbNffuCMwG7VfMVrYUOHcSjXpeSjd8",
    authDomain: "net-ninja-marioplan-8074a.firebaseapp.com",
    databaseURL: "https://net-ninja-marioplan-8074a.firebaseio.com",
    projectId: "net-ninja-marioplan-8074a",
    storageBucket: "net-ninja-marioplan-8074a.appspot.com",
    messagingSenderId: "928839852888",
    appId: "1:928839852888:web:6c5c1a0289974ed0a53b2d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots: true});
// const storage = firebase.storage();

export default (firebase);