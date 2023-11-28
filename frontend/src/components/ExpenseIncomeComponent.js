import * as React from 'react';
import {
    Box,
    Tab,
    Tabs,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    InputAdornment, CircularProgress
} from '@mui/material';
import './styles.css';
import {useEffect, useState} from "react";
import {useUser} from "./UserContext";
import {addTransaction} from "../apiCalls";

const ExpenseIncomeComponent = ({transactions, setTransactions}) => {
    const {currentUser} = useUser();
    const [tabValue, setTabValue] = useState('expense');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(today);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        if (!tabValue || !amount || !date  || isLoading) setIsButtonDisabled(true);
        else setIsButtonDisabled(false)
    }, [tabValue, amount, date, isLoading]);

    const handleSubmit = async () => {
        const data = {
            type: tabValue,
            date: date,
            note: note,
            amount: amount,
            uid: currentUser.uid,
        };



        try {
            setIsLoading(true);
            console.log("Submitting data", data);
            const response = await addTransaction(data);
            console.log("AFTER response", response);
            if (response === 0) {
                console.log("BEFORE SET", transactions)
                setTransactions([data, ...transactions])
                console.log("AFTER SET", transactions)
                setDate(today);
                setNote('');
                setAmount('');
            } else {
                // Handle success
            }
        } catch (error) {
            // Handle error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box className="expenseIncomeComponentWrapper">
            <Box className="expenseIncomeComponentTabs">
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab label="Expense" value="expense"/>
                    <Tab label="Income" value="income"/>
                </Tabs>
            </Box>
            <Box component="form" className="expenseIncomeComponentForm" onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <div className="formRow">
                    <TextField
                        id="amount"
                        label="Amount"
                        type="number"
                        variant="outlined"
                        InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                        className="fullWidth"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <TextField
                        id="date"
                        label="Date"
                        type="date"
                        defaultValue="2023-11-26" // Consider replacing with `value={date}`
                        InputLabelProps={{ shrink: true }}
                        className="fullWidth datePicker"
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <TextField
                    id="note"
                    label="Note"
                    variant="outlined"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <Button variant="contained" className="addButton" disabled={isButtonDisabled} type="submit">{isLoading ? <CircularProgress size={24} /> : `Add ${tabValue}`}</Button>
            </Box>
        </Box>
    );
}

export default ExpenseIncomeComponent;
