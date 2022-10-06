const express = require("express");
const app = express();

app.use(express.static("views"));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
    res.render("index");
});

app.get('/main',(req,res)=>{
    res.render("main.ejs",{numbers: " "});
});

app.listen("3000",()=>{
    console.log("server is running on the 3000 port...");
});