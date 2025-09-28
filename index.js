require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const route = require('./routes');
const dbConnection = require('./database/dbConnection');

app.use(express.json());
app.use(route);

dbConnection()

app.listen(port, () => {
    console.log('This app is listening on port', port);
})