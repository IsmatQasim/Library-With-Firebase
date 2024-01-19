const mainButton = document.getElementsByClassName("main-btn")[0];
function login(){
    window.location.href= "login.html"
}

let SignoutBtn = document.getElementById('signoutbutton');
let Signout = () =>{
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    // window.location.href = 'login.html';

}
SignoutBtn.addEventListener('click', Signout);
mainButton.addEventListener("click", login);



