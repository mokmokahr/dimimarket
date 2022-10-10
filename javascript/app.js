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

let id = [], title = [], desc = [], created = [], author = [], profile =[];
connection.query("SELECT * FROM product", function (error, rows) {
    if (error) throw error;
    for(let i= 0; i < rows.length; i++){
        id[i] = rows[i].id;
        title[i] = rows[i].title;
        desc[i] = rows[i].description;
        created[i] = rows[i].created;
        author[i] = rows[i].author;
        profile[i] = rows[i].profile;
    }
});

app.use(express.static("views"));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/main', (req, res) => {
    res.render("main.ejs",{
        id:id,
        title:title,
        desc:desc,
        created:created,
        author:author,
        profile:profile
    });
});

app.get('/main/product-desc',(req,res)=>{
    res.render("product-desc.ejs");
});

app.get('/create',(req,res)=>{
    res.render("create.ejs");
});


app.listen("3000", () => {
    console.log("\n\n\n\n\n\nserver is running on the 3000 port...");
});