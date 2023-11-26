import {auth} from "./firebaseConfig";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import axios from 'axios';

const delay = ms => new Promise(res => setTimeout(res, ms));

///this function is called when user tries to log in
export const handleLogin = async (email, password) => {
    try {

        let result = await signInWithEmailAndPassword(auth, email, password);
        console.log("RESULT handleLogin", result);
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


///this function gets the incomes of the user for a specific year
export const fetchAnnualIncomes = async (year) => {
    try {
        await delay(1000);
        return {
            '1': 120000,
            '2': 430000,
            '3': 270297,
            '4': 678231,
            '5': 203373,
            '6': 983474,
            '7': 9837830,
            '8': 4884544,
            '9': 289383,
            '10': 334843,
            '11': 874567,
            '12': 983762,
        }

        // let response = await axios.get('https://myapi/annual-incomes', {
        //     params: {
        //         year: year,
        //     },
        // });
        // if (response.status === 200) {
        //     return response.data;
        // }
        // return null;
    } catch (error) {
        console.error(error)
        throw Error(error)
    }
}

///this function gets the expenses of the user for a specific year
export const fetchAnnualExpenses = async (year) => {
    try {
        await delay(1000);
        return {
            '1': 120000,
            '2': 430000,
            '3': 270297,
            '4': 678231,
            '5': 203373,
            '6': 983474,
            '7': 9837830,
            '8': 4884544,
            '9': 289383,
            '10': 334843,
            '11': 874567,
            '12': 983762,
        }
        // let response = await axios.get('https://myapi/annual-expenses',{
        //     params: {
        //         year: year,
        //     },
        // });
        // if (response.status === 200) {
        //     return response.data;
        // }
        // return null;
    } catch (error) {
        console.error(error)
        throw Error(error)
    }
}