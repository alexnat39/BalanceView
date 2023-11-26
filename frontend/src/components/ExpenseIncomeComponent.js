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
    InputAdornment
} from '@mui/material';
import './styles.css';
import {useState} from "react";

const ExpenseIncomeComponent = () => {
    const [tabValue, setTabValue] = useState('expense');
    const [selectedDate, setSelectedDate] = useState('=');

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };


    return (
        <Box className="expenseIncomeComponentWrapper">
            <Box className="expenseIncomeComponentTabs">
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab label="Expense" value="expense"/>
                    <Tab label="Income" value="income"/>
                </Tabs>
            </Box>
            <Box component="form" className="expenseIncomeComponentForm">
                <div className="formRow">
                    <TextField id="amount"
                               label="Amount"
                               variant="outlined"
                               inputMode="numeric"
                               type="number"
                               InputProps={{
                                   startAdornment: <InputAdornment position="start">$</InputAdornment>,
                               }}
                               className="fullWidth"/>
                    <TextField
                        id="date"
                        label="Date"
                        type="date"
                        defaultValue="2023-11-26"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className="fullWidth datePicker"
                    />
                </div>

                <TextField id="note" label="Note" variant="outlined"/>
                <Button variant="contained" className="addButton">Add {tabValue}</Button>
            </Box>
        </Box>
    );
}

export default ExpenseIncomeComponent;
