/**
 * Firebase Configuration and Initialization for Fahm (فَهم)
 * Project ID: fahm-c9c4d
 */

const firebaseConfig = {
  apiKey: "AIzaSyAVkFybuasM2FjtNGenUFuEtgqRNar07x0",
  authDomain: "fahm-c9c4d.firebaseapp.com",
  projectId: "fahm-c9c4d",
  storageBucket: "fahm-c9c4d.firebasestorage.app",
  messagingSenderId: "989292864624",
  appId: "1:989292864624:web:61ca6b9f037e84ddcd40b5"
};

// Expose configuration globally
window.FAHM_FIREBASE_CONFIG = firebaseConfig;

// Initialize Firebase if Firebase SDK is loaded
let firebaseApp = null;
let firestoreDb = null;

try {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      firebaseApp = firebase.initializeApp(firebaseConfig);
    } else {
      firebaseApp = firebase.app();
    }
    firestoreDb = firebase.firestore();
    console.log("Firebase & Firestore initialized successfully for project:", firebaseConfig.projectId);
  }
} catch (e) {
  console.warn("Firebase initialization notice:", e.message);
}

window.FAHM_DB = firestoreDb;
