import './styles.css'
import React, {useEffect, useState} from "react";
import {Bar} from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import ExpenseIncomeComponent from "../components/ExpenseIncomeComponent";
import TransactionsHistoryComponent from "../components/TransactionsHistoryComponent";
import {deleteTransaction, fetchTransactions} from "../apiCalls";
import {useUser} from "../components/UserContext";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const {currentUser} = useUser();
    useEffect(() => {
        const fetchAndSetTransactions = async () => {
            const fetchedTransactions = await fetchTransactions(currentUser.uid);
            if (fetchedTransactions) {
                setTransactions(fetchedTransactions);
            }
        };

        fetchAndSetTransactions();

        //polling
        const intervalId = setInterval(fetchAndSetTransactions, 5000);
        //clearing interval on component unmount
        return () => clearInterval(intervalId);

    }, [transactions, currentUser.uid]);

    const handleDelete = async (transaction) => {
        const result = await deleteTransaction(transaction.id, currentUser.uid);
        if (result === 0) {
            // Remove the deleted transaction from the state
            setTransactions(currentTransactions => currentTransactions.filter(t => t.id !== transaction.id));
        } else {
            // Handle delete error
        }
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Transactions Chart - {year}',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Initialize arrays for income and expenses for each month
    let monthlyIncome = new Array(12).fill(0);
    let monthlyExpenses = new Array(12).fill(0);

    // Process transactions
    transactions.forEach(transaction => {
        const monthIndex = new Date(transaction.date).getMonth(); // Get the month index (0-11)
        const amount = parseFloat(transaction.amount) || 0; // Parse the amount and guard against NaN

        if (transaction.type === 'income') {
            monthlyIncome[monthIndex] += amount; // Accumulate income
        } else if (transaction.type === 'expense') {
            monthlyExpenses[monthIndex] += amount; // Accumulate expenses
        }
    });

    const data = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: monthlyIncome,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Expenses',
                data: monthlyExpenses,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };


    return (
        <div className="navContentWrapper">
            <div className="leftDashboardWrapper">
                <h1>Dashboard</h1>
                <ExpenseIncomeComponent transactions={transactions} setTransactions={setTransactions}/>
                <Bar options={options} data={data}/>
            </div>
            <div className="rightDashboardWrapper">
                <h1>Transactions History</h1>
                <TransactionsHistoryComponent transactions={transactions} onDelete={handleDelete} onEdit={() => {}}/>
            </div>

        </div>
    )
}


export default Dashboard