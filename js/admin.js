'use strict'
const db = firebase.firestore();
const storage = firebase.storage();

// GET DATA BUTTON FUNCTIONS
function getDatabase() {
    let outputAdminHTML = '';
    $('#outputAdmin').html('');
    $('#adminTable').show();
    $('#get-data').addClass('btn-outline-my-dark').removeClass('btn-outline-my-light');
    $('#new-data').addClass('btn-outline-my-light').removeClass('btn-outline-my-dark');
    var productsArray = [];
    setFields();
    $('#createProduct').hide();
    document.getElementById('adminTable').style.display = 'table';
    db.collection("products").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
        var pathReference = storage.ref('products/' + doc.id + '.jpg');
            outputAdminHTML = `
                <tr>
                    <td class="text-center align-middle">
                    <div class="btn-group">
                    <button class="btn btn-sm btn-danger" data-action="DELETE_ITEM">
                    <i class="far fa-trash-alt align-middle" style="font-size: 20px;"></i>
                    </button>
                    <button class="btn btn-sm btn-info" data-action="EDIT_ITEM">
                    <i class="far fa-edit" style="font-size: 20px;"></i>
                    </button>
                    </div>
                    </td>
                    <td class="text-center align-middle">${doc.id}</td>
                    <td><img id="${doc.id}" class="adminTableImage" alt="${doc.data().name}"></td>
                    <td class="text-center align-middle">${doc.data().name}</td>
                    <td class="text-justify align-middle">${doc.data().description}</td>
                    <td class="text-center align-middle">${doc.data().motto}</td>
                    <td class="text-center align-middle">${doc.data().price}</td>
                    <td class="text-center align-middle">${doc.data().numberOfImages}</td>
                </tr>`

                $('#outputAdmin').append(outputAdminHTML);
                pathReference.getDownloadURL().then(function (url) {
                    $('#' + doc.id).attr('src', url).attr('alt', doc.data().name)
                }).catch(function (error) {
                    console.log('Hiba: ', error);
                });
        })
});
}
// HANDLING DELETION
$('#outputAdmin').on('click', '[data-action="DELETE_ITEM"]', function () {
    var r = confirm("Biztos benne?");
    if (r == true) {
        let cell = this.parentElement.parentElement;
        let row = this.parentElement.parentElement.parentElement;
        let deleteID = $(cell).next()[0].innerText;
        db.collection("products").doc(deleteID).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
        fade(row);
    }
});

// HANDLING EDIT
$('#outputAdmin').on('click', '[data-action="EDIT_ITEM"]', function () {
    let cell = this.parentElement.parentElement;
    sessionStorage['editID'] = $(cell).next()[0].innerText;
    $('#adminTable').hide();
    $('#new-data').addClass('btn-outline-my-dark').removeClass('btn-outline-my-light');
    $('#get-data').addClass('btn-outline-my-light').removeClass('btn-outline-my-dark');
    setFields();
    createEditFields();
});

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 25);
}

let inputIDState = 'invalid';
let inputNameState = false;
let inputDescriptionState = false;
let inputPriceState = false;

// UPLOAD NEW DATA BUTTON FUNCTIONS
function setDatabase() {
    inputIDState = 'invalid';
    inputNameState = false;
    inputDescriptionState = false;
    inputPriceState = false;
    $('#adminTable').hide();
    $('#new-data').addClass('btn-outline-my-dark').removeClass('btn-outline-my-light');
    $('#get-data').addClass('btn-outline-my-light').removeClass('btn-outline-my-dark');
    setFields();
    createUploadFields();
    checkFieldsState();
    checkID();
    checkName();
    checkPrice();
    showCharCount();
    $("#inputID").keyup(function () {
        checkID();
        checkFieldsState();
    });
    $("#inputName").keyup(function () {
        checkName();
        checkFieldsState();
    });
    $("#inputDescription").keyup(function () {
        showCharCount();
        checkFieldsState();
    });
    $("#inputPrice").keyup(function () {
        checkPrice();
        checkFieldsState();
    });
};

function checkFieldsState() {
    if (inputIDState === 'new' && inputNameState === true && inputDescriptionState === true && inputPriceState === true) {
        handleButton('success', 'enabled');
    } else if (inputIDState === 'overwrite' && inputNameState === true && inputDescriptionState === true && inputPriceState === true) {
        handleButton('warning', 'enabled');
    } else if (inputIDState === 'overwrite') {
        handleButton('warning', 'disabled');
    } else if (inputIDState === 'invalid' || inputNameState === false || inputDescriptionState === false || inputPriceState === false) {
        handleButton('danger', 'disabled');
    }
}

function setFields() {
    // $("#get-div").hide();
    document.getElementById('filler-left').classList.replace('col-md-4', 'col-xl-2');
    document.getElementById('maincontent').classList.replace('col-md-4', 'col-xl-8');
    document.getElementById('filler-right').classList.replace('col-md-4', 'col-xl-2');
}

function startUpload() {
    // Add a new document in collection "cities"
    const db = firebase.firestore();
    var data = {};
    let id = document.getElementById('inputID').value;
    let name = document.getElementById('inputName').value;
    let numberOfImages = document.getElementById('inputNumberOfImages').value;
    let price = document.getElementById('inputPrice').value;
    let motto = document.getElementById('inputMotto').value;
    let description = document.getElementById('inputDescription').value;
    if (numberOfImages === 0) {
        data = {
            name: name,
            numberOfImages: numberOfImages,
            price: price,
            motto: motto,
            description: description,
            mainImage: id + '.jpg'
        }
    } else {
        data = {
            name: name,
            numberOfImages: numberOfImages,
            price: price,
            motto: motto,
            description: description,
            mainImage: id + '.jpg'
        }
        for (let i = 0; i < numberOfImages; i++) {
            data['image' + [i + 1]] = id + '_' + [i + 1] + '.jpg'
        }
    }
    db.collection("products").doc(id).set(data)
        .then(function () {
            console.log("Document successfully written!");
            handleButton('success', 'disabled')
            checkID();
        })
        .catch(function (error) {
            alert("Hiba a felvitelkor: ", error);
        });
}

function checkPrice() {
    let inputPriceValue = document.getElementById('inputPrice').value;
    if (isNaN(inputPriceValue) || inputPriceValue === '') {
        inputPriceState = false;
        setFieldInvalid('#inputPrice')
    } else {
        inputPriceState = true;
        setFieldValid('#inputPrice')
    }
}

function checkName() {
    let inputNameValue = document.getElementById('inputName').value;
    if (inputNameValue.length < 3) {
        inputNameState = false;
        setFieldInvalid('#inputName')
    } else {
        inputNameState = true;
        setFieldValid('#inputName')
    }
}


function checkID() {
    let inputIDValue = document.getElementById('inputID').value;
    if (inputIDValue.length != 6) {
        inputIDState = 'invalid';
        setFieldInvalid('#inputID');
        checkFieldsState();
    } else if (isNaN(inputIDValue)) {
        inputIDState = 'invalid';
        setFieldInvalid('#inputID');
        checkFieldsState();
    } else {
        let docIDArray = [];
        let matchID = false;
        const db = firebase.firestore();
        db.collection("products").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                docIDArray.push(doc.id);
            })
            for (let i = 0; i < docIDArray.length; i++) {
                if (docIDArray[i] === inputIDValue) {
                    matchID = true;
                }
            }
            if (matchID === true) {
                // CIKKSZÁM LÉTEZIK
                inputIDState = 'overwrite';
                setFieldOverwrite('#inputID');
            } else {
                // CIKKSZÁM NEM LÉTEZIK
                inputIDState = 'new';
                setFieldValid('#inputID');
            }
        });
    };
}

function showCharCount() {
    let inputDescriptionValueLength = document.getElementById('inputDescription').value.length;
    if (inputDescriptionValueLength >= 50) {
        $('#charCount').text('meg van az 50.');
        inputDescriptionState = true;
        setFieldValid('#inputDescription');
    } else {
        inputDescriptionState = false;
        setFieldInvalid('#inputDescription');
        $('#charCount').text('még ' + (50 - inputDescriptionValueLength) + ' karakter kell.');
    }
}

function handleButton(color, state) {
    switch (color + "-" + state) {
        // initial; invalid data
        case 'danger-disabled': {
            $('#uploadButton').prop('disabled', true);
            $('#uploadButton').removeClass('btn-warning');
            $('#uploadButton').removeClass('btn-success');
            $('#uploadButton').addClass('btn-danger');
            $('#uploadButton').text('ÉRVÉNYTELEN ADATOK');
            break;
        }
        // overwrite; invalid data
        case 'warning-disabled': {
            $('#uploadButton').prop('disabled', true);
            $('#uploadButton').text('TERMÉK FELÜLÍRÁSA');
            $('#uploadButton').addClass('btn-warning');
            $('#uploadButton').removeClass('btn-success');
            $('#uploadButton').removeClass('btn-danger');
            break;
        }
        // overwrite; valid data
        case 'warning-enabled': {
            $('#uploadButton').prop('disabled', false);
            $('#uploadButton').text('TERMÉK FELÜLÍRÁSA');
            $('#uploadButton').addClass('btn-warning');
            $('#uploadButton').removeClass('btn-success');
            $('#uploadButton').removeClass('btn-danger');
            break;
        }
        // valid data
        case 'success-enabled': {
            $('#uploadButton').prop('disabled', false);
            $('#uploadButton').removeClass('btn-warning');
            $('#uploadButton').addClass('btn-success');
            $('#uploadButton').removeClass('btn-danger');
            $('#uploadButton').text('TERMÉK RÖGZÍTÉSE');
            break;
        }
        // write successful
        case 'success-disabled': {
            $('#uploadButton').prop('disabled', true);
            $('#uploadButton').removeClass('btn-warning');
            $('#uploadButton').addClass('btn-success');
            $('#uploadButton').removeClass('btn-danger');
            $('#uploadButton').text('TERMÉK SIKERESEN RÖGZÍTVE / FELÜLÍRVA');
            break;
        }
        default:
            alert('Hiba a kódban. Kérem, forduljon a rendszergazdához!')
    }
}

function setFieldInvalid(field) {
    $(field).addClass("is-invalid");
    $(field).removeClass("is-valid");
    $(field).removeClass("is-overwrite");
}

function setFieldValid(field) {
    $(field).addClass("is-valid");
    $(field).removeClass("is-overwrite");
    $(field).removeClass("is-invalid");
}
function setFieldOverwrite(field) {
    $(field).removeClass("is-valid");
    $(field).addClass("is-overwrite");
    $(field).removeClass("is-invalid");
    // setTimeout(function () { alert('Létező cikkszám, a termék minden adata felülírásra kerül!'); }, 250);
}

// FUNCTION CREATEEDITFIELDS az upload alapján, majd a szerkesztéses createUploadFields-et lecserélni

function createEditFields() {
    $('#createProduct').show();
    const db = firebase.firestore();
    var docRef = db.collection("products").doc(sessionStorage['editID']);

    docRef.get().then(function (doc) {
        if (doc.exists) {
            $('#createProduct').html(createProductHTML);
            $("#inputID").val(doc.id);
            $("#inputName").val(doc.data().name);
            $("#inputNumberOfImages").val(doc.data().numberOfImages);
            $("#inputPrice").val(doc.data().price);
            $("#inputMotto").val(doc.data().motto);
            $("#inputDescription").val(doc.data().description);
            handleButton('warning', 'disabled');
            inputIDState = 'overwrite';
            inputNameState = true;
            inputDescriptionState = true;
            inputPriceState = true;

            // checkFieldsState();
            checkID();
            checkName();
            checkPrice();
            showCharCount();
            $("#inputID").keyup(function () {
                checkID();
                checkFieldsState();
            });
            $("#inputName").keyup(function () {
                checkName();
                checkFieldsState();
            });
            $("#inputDescription").keyup(function () {
                showCharCount();
                checkFieldsState();
            });
            $("#inputPrice").keyup(function () {
                checkPrice();
                checkFieldsState();
            });
            $("#inputNumberOfImages").change(function () {
                handleButton('warning', 'enabled');
            });
            $("#inputMotto").keyup(function () {
                handleButton('warning', 'enabled');
            });
        } else {
            alert('Nem található ilyen dokumentum. Hiba lehet a kódban, szóljon a rendszergazdának!')
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

}


function createUploadFields() {
    let randomID = (Math.floor(100000 + Math.random() * 900000));
    $('#createProduct').show();
    $('#createProduct').html(createProductHTML);
    $('#inputID').val(randomID);
}

/*
// FILE DOWNLOAD TEST
var storage = firebase.storage();
var pathReference = storage.ref('list/202010.jpg');
// Create a reference to the file we want to download
var mainImageRef = pathReference.child('list/202010.jpg');

// Get the download URL
pathReference.getDownloadURL().then(function(url) {
  // Insert url into an <img> tag to "download"
  var img = document.getElementById('test');
  img.src = url;
}).catch(function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/object-not-found':
      // File doesn't exist
      break;

    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect the server response
      break;
  }
}); */