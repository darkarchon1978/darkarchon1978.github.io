firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in
        document.getElementById('user_div').style.display = "initial";
        document.getElementById('login_div').style.display = "none";
    } else {
        // No user is signed in
        document.getElementById('user_div').style.display = "none";
        document.getElementById('login_div').style.display = "initial";
    }
});

function login() {
    let userEmail = document.getElementById("email-field").value;
    let userPassword = document.getElementById("password-field").value;
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert('Hiba: ' + errorMessage);

        // ...
    });
}