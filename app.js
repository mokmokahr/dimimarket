const express = require("express");
const app = express();
const bodyParser = require('body-parser');

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
let user_id = [], user_pw = [];
let isPasswordCorrect = false, isIdExist = false, isLogined = false;
connection.query("SELECT * FROM login_info", function (error, rows) {
    if (error) throw error;
    for(let i= 0; i < rows.length; i++){
        user_id[i] = rows[i].user_id;
        user_pw[i] = rows[i].user_pw;
    }
});

app.use(express.static("views"));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/login_get',(req,res)=>{
    if(isLogined){
        console.log("you are already logined. Do you want to logout?");
        res.redirect('/');
    }
    else{res.render("login.ejs");}
});

app.post('/login',(req,res)=>{
    let userIdInput = req.body.user_id, userPwInput = req.body.user_pw;
    for(let i = 0; i<user_id.length; i++){
        if(isLogined){
            break;
        }
        if(userIdInput == user_id[i]){
            isIdExist = true;
            if(userPwInput == user_pw[i]){
                isPasswordCorrect = true;
            }
        }
    }
    if(isIdExist == true && isPasswordCorrect == true){
        isLogined = true;
        console.log("login suceed");
    }
    else if(isIdExist == false){
        console.log("id does not exist");
    }
    else if(isPasswordCorrect == false){
        console.log("password do not match");
    }
    isIdExist = false;
    res.redirect('/');
});

app.get('/signup',(req,res)=>{
    res.render("signup.ejs");
});

app.post('/signup_p',(req,res)=>{
    connection.query("INSERT INTO login_info (user_id, name, user_pw, signup_date) VALUES (?,?,?,NOW());",[req.body.id,req.body.name,req.body.pw], function (error, rows) {
        if (error) throw error;
        else{
            console.log(rows.insertId);//생성될때 auto increasement의 값
            res.render("login.ejs");
        }
    });
})

app.listen("3000", () => {
    console.log("\n\n\n\n\n\nserver is running on the 3000 port...\n\n\n\n\n");
});

/*
해야할것: 쿠키
상품 CUD(R이미구현)
채팅서비스
*/