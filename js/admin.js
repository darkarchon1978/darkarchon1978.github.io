'use strict'

// GET DATA BUTTON FUNCTIONS
document.getElementById("get-data").addEventListener("click", function (event) {
    event.preventDefault();
    $('#adminTable').show();
    $('#get-list-item').addClass('active-bg');
    $('#new-list-item').removeClass('active-bg');
    var productsArray = [];
    const db = firebase.firestore();
    setFields();
    $('#createProduct').hide();
    document.getElementById('adminTable').style.display = 'table';
    db.collection("products").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var arr = [];
            let id = { id: doc.id };
            arr = doc.data();
            Object.assign(arr, id);
            productsArray.push(arr);
        });
        // GENERATING TABLE ROWS
        let outputAdminHTML = '';
        $.each(productsArray, function (index, value) {
            ++index;
            outputAdminHTML += `
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
                    <td class="text-center align-middle">${value.id}</td>
                    <td><img src="img/list/${value.mainImage}" class="adminTableImage" alt="${value.name}"></td>
                    <td class="text-center align-middle">${value.name}</td>
                    <td class="text-justify align-middle">${value.description}</td>
                    <td class="text-center align-middle">${value.motto}</td>
                    <td class="text-center align-middle">${value.price}</td>
                    <td class="text-center align-middle">${value.numberOfImages}</td>
                </tr>`

        })
        $('#outputAdmin').html(outputAdminHTML);

        // HANDLING DELETION
        $('#outputAdmin').on('click', '[data-action="DELETE_ITEM"]', function () {
            alert('Ezt most ne!')
            // MODAL HANDLING - ARE YOU SURE?
        });
    });
});

let inputIDState = 'invalid';
let inputNameState = false;
let inputDescriptionState = false;
let inputPriceState = false;

// UPLOAD NEW DATA BUTTON FUNCTIONS
document.getElementById("new-data").addEventListener("click", function (event) {
    event.preventDefault();
    $('#adminTable').hide();
    $('#get-list-item').removeClass('active-bg');
    $('#new-list-item').addClass('active-bg');
    setFields();
    createUploadFields();
    checkFieldsState();
    checkID();
    checkName();
    checkPrice();
    showCharCount();
    $("#inputID").keyup(function () {
        checkID();
        // checkFieldsState(); <- a checkID funkción belül van
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
});

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
    alert('Feltöltés... lenne, ha kész lenne a funkció.')
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
    let inputDescriptionValue = document.getElementById('inputDescription').value;
    if (inputNameValue.length < 3) {
        inputNameState = false;
        setFieldInvalid('#inputName')
    } else {
        inputNameState = true;
        setFieldValid('#inputName')
    }

    if (inputDescriptionValue.length < 50) {
        inputDescriptionState = false;
        setFieldInvalid('#inputDescription')
    } else {
        inputDescriptionState = true;
        setFieldValid('#inputDescription')
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
            checkFieldsState();
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

function createUploadFields() {
    $('#createProduct').show();
    let randomID = (Math.floor(100000 + Math.random() * 900000));
    let createProductHTML = `
<div class="form-row" id="upload-fields">
<div class="form-group col-md-2">
        <input type="text" class="form-control" id="inputID" value="${randomID}">
        <small class="form-text text-muted">hatszámjegyű cikkszám</small>
</div>

<div class="form-group col-md-8">
    
    <input placeholder="Megnevezés" type="text" class="form-control" id="inputName">
    <small class="form-text text-muted">minimum 3 karakter</small>
</div>
<div class="form-group col-md-2">

<div class="input-group">
<div class="input-group-prepend">
<label class="input-group-text" for="inputNumberOfImages">Képek</label>
</div>
<select class="custom-select" id="inputNumberOfImages">
<option selected>0</option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
</select>
</div>

<small class="form-text text-muted">extra képek száma</small>
    
</div>
</div>
<div class="form-row">
<div class="form-group col-md-2">

    <input placeholder="Ár" type="text" class="form-control" id="inputPrice">
    <small class="form-text text-muted">csak számjegyek</small>
</div>

<div class="form-group col-md-10">

    <input placeholder="Mottó" type="text" class="form-control" id="inputMotto">
    <small class="form-text text-muted">(nem kötelező)</small>
</div>
</div>
<div class="form-group">

<textarea placeholder="Leírás" class="form-control text-justify" id="inputDescription"
    rows="8"></textarea>
    <small class="form-text text-muted">minimum 50 karakter: <span id="charCount"></span></small>
</div>
<button id="uploadButton" onclick="startUpload()" class="btn btn-block btn-success">TERMÉK RÖGZÍTÉSE</button>`
    $('#createProduct').html(createProductHTML);
}