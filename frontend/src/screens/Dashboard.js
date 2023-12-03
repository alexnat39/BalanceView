import './styles.css'
import React, {useEffect, useState} from "react";
import {Bar} from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import {fetchTransactions} from "../apiCalls";
import {useUser} from "../components/UserContext";
import io from 'socket.io-client';
import {MenuItem, Select} from "@mui/material";

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
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [totalYearIncome, setTotalYearIncome] = useState(0);
    const [totalYearExpense, setTotalYearExpense] = useState(0);

    const {currentUser} = useUser();
    const socket = io('http://localhost:8080');

    const fetchAndSetTransactions = async () => {
        const fetchedTransactions = await fetchTransactions(currentUser.uid);
        if (fetchedTransactions) {
            calculateTotalIncomeExpense(fetchedTransactions, selectedYear)
            setTransactions(fetchedTransactions);
        }
    };

    const calculateTotalIncomeExpense = (fetchedTransactions, year) => {
        let calculatedTotalIncome = 0;
        let calculatedTotalExpense = 0;
        fetchedTransactions.forEach(transaction => {
            const transactionDate = new Date(transaction.date);
            const transactionYear = transactionDate.getFullYear();
            if (transactionYear === selectedYear) {
                const amount = parseFloat(transaction.amount) || 0;
                if (transaction.type === 'income') {
                    calculatedTotalIncome += amount;
                } else if (transaction.type === 'expense') {
                    calculatedTotalExpense += amount;
                }

            }
        });
        setTotalYearIncome(calculatedTotalIncome);
        setTotalYearExpense(calculatedTotalExpense);
    }

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

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Transactions Chart - ${selectedYear}`,
            },
        },
    };

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let monthlyIncome = new Array(12).fill(0);
    let monthlyExpenses = new Array(12).fill(0);

    transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.date);
        const transactionYear = transactionDate.getFullYear();
        const monthIndex = transactionDate.getMonth();
        if (transactionYear === selectedYear) {
            const amount = parseFloat(transaction.amount) || 0;

            if (transaction.type === 'income') {
                monthlyIncome[monthIndex] += amount;
            } else if (transaction.type === 'expense') {
                monthlyExpenses[monthIndex] += amount;
            }
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
                <div className="yearSelector" style={{marginTop: '20px'}}>
                    <p>Select a year:</p>
                    <Select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="yearSelector"
                        style={{marginLeft: "10px"}}
                        fullwidth={"true"}
                    >
                        {[1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023].map((year) => (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                    </Select>
                </div>
                <Bar options={options} data={data}/>
            </div>
            <div className="rightDashboardWrapper">
                <div style={{display: "flex", flexDirection: "row", marginBottom: "10px"}}>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginRight: "25px"}}>
                        <p style={{fontSize: "36px", color: "green", fontWeight: "bold", margin: "0px"}}>{totalYearIncome} USD</p>
                        <p style={{fontSize: "26px", margin: "0px"}}>TOTAL INCOME</p>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <p style={{fontSize: "36px", color: "red", fontWeight: "bold",  margin: "0px"}}>{totalYearExpense} USD</p>
                        <p style={{fontSize: "26px", margin: "0px"}}>TOTAL EXPENSE</p>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <p style={{fontSize: "44px", color: (totalYearIncome - totalYearExpense >= 0) ? "green" : "red", fontWeight: "bold",  margin: "0px"}}>{totalYearIncome - totalYearExpense} USD</p>
                    <p style={{fontSize: "30px", margin: "0px"}}>{selectedYear} PROFIT</p>
                </div>
            </div>

        </div>
    )
}


export default Dashboard