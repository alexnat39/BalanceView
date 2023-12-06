# Getting Started with BalanceView

## HOW TO RUN THE APP:
1. First, you need to start SQL server. Follow commands in ****Notes on Database****

   Open new terminal window and paste: 

    - mysql -u root -p

2. cd backend
3. node server.js
4. cd frontend
5. npm start


### Note
Before running the Database Steps, you need to go into backend/server.js and replace a password inside the mysql.createConnection function

### Notes on Database
1. You will need to create a database called 'balanceview'
   1. ***CREATE DATABASE balanceview;***
   2. ***USE balanceview;***
2. You need to add 2 tables to that database: 'transactions' & 'users'
   1. ***CREATE TABLE transactions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      type VARCHAR(255),
      amount DECIMAL(10, 2),
      date DATE,
      note TEXT,
      uid TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );***

   2. ***CREATE TABLE users (
      organizationName TEXT,
      email TEXT,
      uid TEXT
      );***
3. You can populate the database through the app now!