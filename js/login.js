firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in
        document.getElementById('user-div').style.display = "initial";
        document.getElementById('get-div').style.display = "initial";
        document.getElementById('login-div').style.display = "none";
    } else {
        // No user is signed in
        document.getElementById('user-div').style.display = "none";
        document.getElementById('get-div').style.display = "none";
        document.getElementById('login-div').style.display = "initial";
    }
});

let showEmail = ''
let mail = document.getElementById('usermail-div');
mail.innerText = JSON.parse(sessionStorage['showEmail'].toString());

function logIn() {
    let userEmail = document.getElementById("email-field").value;
    let userPassword = document.getElementById("password-field").value;
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert('Hiba: ' + errorMessage);
    });
    sessionStorage['showEmail'] = JSON.stringify(userEmail);
    let mail = document.getElementById('usermail-div');
    showEmail = userEmail;
    mail.innerText = userEmail;
}

function logOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
}