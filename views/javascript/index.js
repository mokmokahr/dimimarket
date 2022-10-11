//main.ejs
let element = document.querySelector("#go-to-dimimarket");
element.onclick = function () {
    location.href = "main.ejs";
}

function moveToLoginPage(){
    location.href = "/login_get";
}

//create.ejs
const realUpload = document.querySelector('.real-upload');
const upload = document.querySelector('.upload');
upload.addEventListener('click', () => realUpload.click());

function goToCreatePage(){
    location.href = "/create";
}