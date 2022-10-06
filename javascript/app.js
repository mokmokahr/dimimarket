const express = require("express");
const app = express();

app.get('/', (req,res)=>{
    res.render("index.html");
});

app.get('/main',(req,res)=>{
    res.render("main.ejs",{number:""});
});