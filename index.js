require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const route = require('./routes');
const dbConnection = require('./database/dbConnection');
dbConnection()

app.use(express.json());
app.use(route);

app.use(express.static(path.join(__dirname, "view")));

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "view", "404.html"))
})

app.listen(port, () => {
    console.log('This app is listening on port', port);
})