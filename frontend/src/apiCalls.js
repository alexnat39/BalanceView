import {auth} from "./firebaseConfig";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";


const delay = ms => new Promise(res => setTimeout(res, ms));

///this function is called when user tries to log in
export const handleLogin = async (email, password) => {
    try {

        let result = await signInWithEmailAndPassword(auth, email, password);
        console.log("RESULT handleSignUp", result);
        await delay(1000);
        return 0
    } catch (error) {
        console.error("ERR", error.message);
        throw Error(error.message)
    }
};

///this function is called when user tries to sign up
export const handleSignUp = async (email, password) => {
    try {
        let result = await createUserWithEmailAndPassword(auth, email, password);
        console.log("RESULT handleSignUp", result);
        await delay(1000);
        return 0
    } catch (error) {
        console.error("ERR", error.message);
        throw Error(error.message)
    }
};

///this function is called when user tries to log out
export const handleLogOut = async () => {
    try {
        await signOut(auth);
        // Redirect or handle success as needed
    } catch (error) {
        console.error(error.message);
        throw Error(error.message)
    }
};