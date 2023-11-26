import './styles.css'
import React from "react";
import {Bar} from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import ExpenseIncomeComponent from "../components/ExpenseIncomeComponent";
import TransactionsHistoryComponent from "../components/TransactionsHistoryComponent";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const Dashboard = () => {
    // const data = [
    //     {
    //         label: 'Purchases',
    //         data: [
    //             {
    //                 date: new Date(),
    //                 stars: 299320,
    //             },
    //         ],
    //     },
    // ]


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

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const data = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: labels.map(() => generateRandomNumber(0, 10000)),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Expenses',
                data: labels.map(() => generateRandomNumber(0, 10000)),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };


    return (
        <div className="navContentWrapper">
            <div className="leftDashboardWrapper">
                <h1>Dashboard</h1>
                <ExpenseIncomeComponent/>
                <Bar options={options} data={data}/>
            </div>
            <div className="rightDashboardWrapper">
                <h1>Transactions History</h1>
                <TransactionsHistoryComponent/>
            </div>

        </div>
    )
}


export default Dashboard