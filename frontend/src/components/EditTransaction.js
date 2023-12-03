import React, { useState } from 'react';
import {
    Box,
    Tab,
    Tabs,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    CircularProgress
} from '@mui/material';
import { editTransaction } from "../apiCalls";
import './styles.css';
const EditTransactionPopUp = ({ open, handleClose, transaction, setTransactions }) => {
    const [tabValue, setTabValue] = useState(transaction.type);
    const [amount, setAmount] = useState(transaction.amount);
    const [note, setNote] = useState(transaction.note);
    const [date, setDate] = useState(transaction.date.split('T')[0]);
    const [isLoading, setIsLoading] = useState(false);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleUpdate = async () => {
        setIsLoading(true);
        const updatedTransaction = {
            ...transaction,
            type: tabValue,
            amount: amount,
            note: note,
            date: date
        };

        const response = await editTransaction(transaction.id, updatedTransaction);
        if (response === 0) {
            setTransactions((prevTransactions) =>
                prevTransactions.map((t) =>
                    t.id === transaction.id ? updatedTransaction : t
                )
            );
            handleClose();
        } else {

        }
        setIsLoading(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} className="editDialog" fullWidth maxWidth="sm">
            <DialogTitle>Edit Transaction</DialogTitle>
            <DialogContent>
                <Box className="expenseIncomeComponentTabs">
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab label="Expense" value="expense" />
                        <Tab label="Income" value="income" />
                    </Tabs>
                </Box>
                <Box component="form" className="expenseIncomeComponentForm">
                    <TextField
                        label="Amount"
                        type="number"
                        variant="outlined"
                        InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Note"
                        variant="outlined"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleUpdate} disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : 'Update'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTransactionPopUp;
