import './styles.css'
import React, {useEffect, useState} from "react";
import {Bar} from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import ExpenseIncomeComponent from "../components/ExpenseIncomeComponent";
import TransactionsHistoryComponent from "../components/TransactionsHistoryComponent";
import {deleteTransaction, fetchTransactions} from "../apiCalls";
import {useUser} from "../components/UserContext";
import io from 'socket.io-client';
import EditTransactionPopUp from "../components/EditTransaction";
import {MenuItem, Select} from "@mui/material";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const {currentUser} = useUser();
    const socket = io('http://localhost:8080');

    const fetchAndSetTransactions = async () => {
        const fetchedTransactions = await fetchTransactions(currentUser.uid);
        if (fetchedTransactions) {
            setTransactions(fetchedTransactions);
        }
    };
    useEffect(() => {
        fetchAndSetTransactions().then(r => console.log(r));
    }, [selectedYear]);

    useEffect(() => {
        socket.on('transactionUpdated', () => {
            fetchAndSetTransactions();
        });

        return () => {
            socket.off('transactionUpdated');
            socket.disconnect();
        };
    }, [socket]);

    const handleDelete = async (transaction) => {
        await deleteTransaction(transaction.id, currentUser.uid);
    };

    const handleEdit = (transaction) => {
        setSelectedTransaction(transaction);
        setIsEditPopupOpen(true);
    };

    const handleCloseEditPopup = () => {
        setIsEditPopupOpen(false);
        setSelectedTransaction(null); // Reset the selected transaction
    };

    return (
        <div className="navContentWrapper">
            <div className="leftTransactionsWrapper">
                <h1>Add Transaction</h1>
                <ExpenseIncomeComponent transactions={transactions}/>
            </div>
            <div className="rightTransactionsWrapper">
                <h1>Transaction History</h1>
                <TransactionsHistoryComponent transactions={transactions} onDelete={handleDelete} onEdit={handleEdit}/>
                {isEditPopupOpen && (
                    <EditTransactionPopUp
                        open={isEditPopupOpen}
                        handleClose={handleCloseEditPopup}
                        transaction={selectedTransaction}
                        setTransactions={setTransactions}
                    />
                )}
            </div>

        </div>
    )
}


export default Transactions