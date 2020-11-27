const express = require('express');
const cors = require('cors');

const itemsRouter = require('./routes/items');


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

