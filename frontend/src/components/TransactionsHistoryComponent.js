import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles.css';
import moment from 'moment';


const TransactionsHistoryComponent = ({ transactions, onEdit, onDelete }) => {
    return (
        <Box>
            <TableContainer component={Paper} sx={{ border: '1px solid #CECECF', borderRadius: '8px' }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Note</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction, index) => {
                            const formattedDate = moment(transaction.date).format('MM-DD-YYYY');

                            return (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">{formattedDate}</TableCell>
                                    <TableCell align="right">{transaction.amount}</TableCell>
                                    <TableCell align="right">{transaction.type}</TableCell>
                                    <TableCell align="right">{transaction.note}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => onEdit(transaction)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => onDelete(transaction)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default TransactionsHistoryComponent;
