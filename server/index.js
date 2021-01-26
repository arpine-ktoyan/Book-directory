require("dotenv").config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const itemsRouter = require('./api/routes/items');
const dbURI = process.env.DB_URI;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Cannot connect to the database. Exiting now...', err);
});

const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Connection to db established"));

const app = express();
app.use(express.json());

app.use(cors({ origin: 'http://localhost:4200', optionsSuccessStatus: 200 }));

app.use('/', itemsRouter);

app.use('/', (req, res) => {
    res.send('Works!');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

