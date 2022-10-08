const express = require("express");
const app = express();

require('dotenv').config();

let mysql = require('mysql');

let connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

connection.end();

app.use(express.static("views"));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/main', (req, res) => {
    res.render("main.ejs", { numbers: " " });
});

app.listen("3000", () => {
    console.log("server is running on the 3000 port...");
});