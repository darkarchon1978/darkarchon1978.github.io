let mail = document.getElementById('usermail-div');

if (sessionStorage['showEmail'] != null) {
    mail.innerText = JSON.parse(sessionStorage['showEmail'].toString());
} else {
    logOut();
}


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in
        document.getElementById('user-div').style.display = "initial";
        document.getElementById('get-div').style.display = "flex";
        document.getElementById('login-div').style.display = "none";
    } else {
        // No user is signed in
        document.getElementById('user-div').style.display = "none";
        document.getElementById('get-div').style.display = "none";
        document.getElementById('login-div').style.display = "initial";
    }
});

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
    mail.innerText = JSON.parse(sessionStorage['showEmail'].toString());
}

function logOut() {
    firebase.auth().signOut().then(function () {
        logOutReset();
    }).catch(function (error) {
        alert('Hiba kijelentkezéskor: ' + error)
    });
}

function logOutReset() {
    sessionStorage.clear();
    document.getElementById('filler-left').classList.replace('col-xl-2', 'col-md-4');
    document.getElementById('maincontent').classList.replace('col-xl-8', 'col-md-4');
    document.getElementById('filler-right').classList.replace('col-xl-2', 'col-md-4');
    document.getElementById("email-field").value = '';
    document.getElementById("password-field").value = '';
    document.getElementById('adminTable').style.display = 'none';
}