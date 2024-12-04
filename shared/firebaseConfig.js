import { initializeApp } from "firebase/app";

import { getAnalytics, isSupported } from "firebase/analytics";

//Configurations
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "my-projects-df001.firebaseapp.com",
  projectId: "my-projects-df001",
  storageBucket: "chat-app-86f48.appspot.com",
  messagingSenderId: "844486547917",
  appId: "1:844486547917:web:2356a0a7e94b8f56cccc84",
  measurementId: "G-P3EEP6GBG9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined" && isSupported()) {
  analytics = getAnalytics(app);
}

export default app;
