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

        // let response = await axios.get('https://localhost:8080/annual-incomes', {
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
        // let response = await axios.get('https://localhost:8080/annual-expenses',{
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


export const addTransaction = async (transactionData) => {
    try {
        console.log("BEFORE POST");
        const response = await fetch('http://localhost:8080/addTransaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transactionData),
        });
        console.log("AFTER POST response", response);

        if (response.status === 200) {
            console.log('Transaction added successfully');
            return 0
        } else {
            console.error('Failed to add transaction');
            return -1
        }
    } catch (error) {
        console.error('Error:', error);
        return -1

    }
}

export const fetchTransactions = async (uid) => {
    try {
        console.log("Sending request to fetch transactions");
        const response = await fetch('http://localhost:8080/getAllUserTransactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid }), // Send UID in the request body as JSON
        });
        console.log("Response received", response);

        if (response.ok) {
            const transactions = await response.json(); // Parse the JSON response
            console.log('Transactions fetched successfully', transactions);
            return transactions; // Return the transactions
        } else {
            console.error('Failed to fetch transactions');
            return null; // Handle error appropriately
        }
    } catch (error) {
        console.error('Error:', error);
        return null; // Handle error appropriately
    }
}

export const deleteTransaction = async (transactionId, uid) => {
    try {
        const response = await fetch('http://localhost:8080/deleteTransaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid, transactionId }),
        });
        console.log("Response received", response);

        if (response.status === 200) {
            console.log('Transaction deleted successfully');
            return 0;
        } else {
            console.error('Failed to deleted transaction.');
            return -1;
        }
    } catch (error) {
        console.error('Error:', error);
        return -1;
    }
}

export const editTransaction = async (transactionId, transactionData) => {
    try {
        const response = await fetch('http://localhost:8080/ediTransaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                transactionId,
                ...transactionData,
            }),
        });
        console.log("Response received", response);

        if (response.status === 200) {
            console.log('Transaction edited successfully');
            return 0;
        } else {
            console.error('Failed to edit transaction.');
            return -1;
        }
    } catch (error) {
        console.error('Error:', error);
        return -1;
    }
}
