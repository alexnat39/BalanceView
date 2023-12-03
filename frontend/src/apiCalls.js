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
        if (result.user.uid) {
            await addUserInformation(result.user.uid, {email: email, uid: result.user.uid, organizationName: ""})
        }
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
    } catch (error) {
        console.error(error.message);
        throw Error(error.message)
    }
};


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
            body: JSON.stringify({uid}),
        });
        console.log("Response received", response);

        if (response.ok) {
            const transactions = await response.json();
            console.log('Transactions fetched successfully', transactions);
            return transactions;
        } else {
            console.error('Failed to fetch transactions');
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export const deleteTransaction = async (transactionId, uid) => {
    try {
        const response = await fetch('http://localhost:8080/deleteTransaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({uid, transactionId}),
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
        const response = await fetch('http://localhost:8080/editTransaction', {
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

export const fetchUserInformation = async (uid) => {
    try {
        console.log("Sending request to fetch user information");
        const response = await fetch('http://localhost:8080/getUserInformation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({uid}),
        });
        console.log("Response received", response);
        if (response.ok) {
            const userInformation = await response.json();
            console.log('User information fetched successfully', userInformation);
            return userInformation[0];
        } else {
            console.error('Failed to fetch user information');
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export const addUserInformation = async (uid, userData) => {
    try {
        console.log("Sending request to add user information");
        const response = await fetch('http://localhost:8080/addUserInformation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({uid, ...userData,}),
        });
        console.log("Response received", response);
        if (response.ok) {
            const userInformation = await response.json();
            console.log('User information fetched successfully', userInformation);
            return userInformation;
        } else {
            console.error('Failed to fetch user information');
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export const editUserInformation = async (uid, userData) => {
    try {
        console.log("Sending request to edit user information");
        const response = await fetch('http://localhost:8080/editUserInformation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({uid, ...userData,}),
        });
        console.log("Response received", response);
        if (response.ok) {
            const userInformation = await response.json();
            console.log('User information fetched successfully', userInformation);
            return userInformation;
        } else {
            console.error('Failed to fetch user information');
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
