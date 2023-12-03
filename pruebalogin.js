
let users = JSON.parse(localStorage.getItem('users')) || [];
let idCounter = users.length > 0 ? users[users.length - 1].id + 1 : 1;
var iduser;

const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registerButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  
    console.log("soy?");
  
  });
  
  loginButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
    
  });

document.addEventListener("DOMContentLoaded", function() {
const btnReg = document.getElementById("btnRegister")
console.log(btnReg);
btnReg.addEventListener("click", register)
const btnLog = document.getElementById("btnLogin")
btnLog.addEventListener("click", login)

function register() {
    event.preventDefault();

    let newUsername = document.getElementById('newUsername').value;
    let newEmail = document.getElementById('newEmail').value;
    let newPassword = document.getElementById('newPassword').value;
    let newUser = {
        id: idCounter,
        username: newUsername,
        email: newEmail,
        password: newPassword
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    idCounter++;
    alert('Usuario registrado con éxito!');
}

function login() {
    event.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    for(let i = 0; i < users.length; i++) {
        if(users[i].username === username && users[i].password === password) {
            alert('Inicio de sesión exitoso!');
            myid = users[i].id; // Cambia 'iduser' a 'myid'
            console.log(myid); // Accede a 'window.myid', no solo a 'myid'
            localStorage.setItem('myide', myid);
            window.location.href="/index.html"
            i = users.length;
        }
    }
    console.log("El valor es:" + myid) // Accede a 'window.myid', no solo a 'myid'


    if(myid == 0){ // Accede a 'window.myid', no solo a 'myid'
        alert('Usuario o contraseña incorrectos.');
    }
}


});


