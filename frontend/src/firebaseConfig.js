import 'firebase/compat/auth';
import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
//initializing firebase app
export const firebaseConfig = {
    apiKey: "AIzaSyAMQiI7KkoGje4taMjnzo23SAiu07w_rHI",
    authDomain: "balanceview-a3e69.firebaseapp.com",
    projectId: "balanceview-a3e69",
    storageBucket: "balanceview-a3e69.appspot.com",
    messagingSenderId: "8317767633",
    appId: "1:8317767633:web:34641fada1d6d7358f5af0",
    measurementId: "G-XRP2LL1PRD"
};
const app = await initializeApp(firebaseConfig);
export const auth = getAuth(app);



