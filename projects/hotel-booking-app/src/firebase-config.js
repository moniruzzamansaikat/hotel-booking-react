import firebase from "firebase";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyB69BB420PSUOL1CgePzGZxvQhJcvVs4QI",
  authDomain: "hotel-booking-app-a8bbb.firebaseapp.com",
  projectId: "hotel-booking-app-a8bbb",
  storageBucket: "hotel-booking-app-a8bbb.appspot.com",
  messagingSenderId: "589156916664",
  appId: "1:589156916664:web:d93c6734cdf3eed558834d",
};

// Initialize Firebase
if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
export default firebase;
