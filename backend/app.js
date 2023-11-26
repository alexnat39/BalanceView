import express from 'express'
import {getUser, createUser} from "./database.js"

const app = express()

app.get("/login", async (req, res) => {
    const user = await getUser('12345678');
    res.send(user);
})

app.get("/signup", (req, res) => {
    res.send("Signing up");
})
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send("500: Something went wrong.")
});

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})