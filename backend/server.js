import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configure your SQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your database user
    password: 'vAsya37340!', // replace with your database password
    database: 'balanceview' // replace with your database name
});


db.connect((err) => {
    if (err) {
        console.log('err', err);
        throw err;
    }
    console.log('Connected to the SQL database...');
});

/// this end point adds a transaction to the database
app.post('/addTransaction', async (req, res) => {
    const { type, amount, date, note, uid } = req.body;
    const createdAt = new Date();
    console.log("createdAt", createdAt)
    // SQL query to insert data
    const query = `INSERT INTO transactions (type, amount, date, note, uid, createdAt) VALUES (?, ?, ?, ?, ?, ?)`;
    console.log("query", query)
    db.query(query, [type, amount, date, note, uid, createdAt], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Transaction Added Successfully');
        }
    });
});

/// this end point get all transactions specified by uid
app.post('/getAllUserTransactions', async (req, res) => {
    const { uid } = req.body;

    // SQL query to select data
    const query = 'SELECT * FROM transactions WHERE uid = ? ORDER BY createdAt DESC';
    console.log("query", query)
    console.log("uid", uid);

    db.query(query, [uid], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).json(results);
        }
    });
});


/// this end point edits a specific transaction
app.post('/editTransaction', async (req, res) => {
    const { transactionId, type, amount, date, note, uid } = req.body;

    // SQL query to update data
    const query = 'UPDATE transactions SET type = ?, amount = ?, date = ?, note = ? WHERE id = ? AND uid = ?';

    db.query(query, [type, amount, date, note, transactionId, uid], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Transaction Updated Successfully');
        }
    });
});


/// this end point deletes a specific transaction
app.post('/deleteTransaction', async (req, res) => {
    const { transactionId, uid } = req.body;

    // SQL query to delete data
    const query = 'DELETE FROM transactions WHERE id = ? AND uid = ?';

    db.query(query, [transactionId, uid], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Transaction Deleted Successfully');
        }
    });
});



// Start the server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
