const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const inputButton = document.querySelector("#loginButton");
const linkLogin = document.querySelector(".btnLogin");
const validEmail = "benjaminverlaine@gmail.com";
const validPassword = "1234";
let msgError = document.querySelector("#error");
let isLogin = false;
window.localStorage.setItem("isLogin", isLogin);
const isConected = window.localStorage.getItem("isLogin");
console.log(inputEmail);
console.log(inputPassword);
console.log(inputButton);
console.log(msgError);
console.log(linkLogin);

inputButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (
        validEmail === inputEmail.value &&
        validPassword === inputPassword.value
    ) {
        window.localStorage.setItem("isLogin", true);
        window.location.href = "../index.html";
    } else {
        msgError.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
    }
    console.log(isConected);
});
