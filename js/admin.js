'use strict'

// GET DATA BUTTON FUNCTIONS
function getFireBaseData() {
    var productsArray = [];
    const db = firebase.firestore();
    setFields();
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

}

// UPLOAD NEW DATA BUTTON FUNCTIONS
function createFireBaseData() {
    let id = (Math.floor(100000 + Math.random() * 900000));
    setFields();
    let createProductHTML = `
    <div class="form-row">
    <div class="form-group col-md-2">
            <input type="text" class="form-control" id="inputID" value="${id}">
    </div>

    <div class="form-group col-md-8">
        
        <input placeholder="Megnevezés" type="text" class="form-control" id="inputName">
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
        
        
    </div>
</div>
<div class="form-row">
    <div class="form-group col-md-2">
    
        <input placeholder="Ár" type="text" class="form-control" id="inputPrice">
    </div>

    <div class="form-group col-md-10">
    
        <input placeholder="Mottó" type="text" class="form-control" id="inputMotto">
    </div>
</div>
<div class="form-group">
 
    <textarea placeholder="Leírás" class="form-control" id="inputDescription"
        rows="5"></textarea>
    </div>
    <button id="uploadButton" onclick="startUpload()" class="btn btn-block btn-success">TERMÉK RÖGZÍTÉSE</button>`
    $('#createProduct').html(createProductHTML);
    checkID();
    $("#inputID").change(function () {
        checkID()
    });
}

function setFields() {
    $("#get-div").hide();
    document.getElementById('filler-left').classList.replace('col-md-4', 'col-xl-2');
    document.getElementById('maincontent').classList.replace('col-md-4', 'col-xl-8');
    document.getElementById('filler-right').classList.replace('col-md-4', 'col-xl-2');
}

function startUpload() {
    console.log('Feltöltés...')
}

function checkID() {
    let inputIDValue = document.getElementById('inputID').value;
    if (inputIDValue.length != 6) {
        setInvalid();
        alert('A cikkszám nem hatjegyű!')
    } else if (isNaN(inputIDValue)) {
        setInvalid();
        alert('A cikkszám nem csak számokból áll!')
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
                setOverwrite();
            } else {
                // CIKKSZÁM NEM LÉTEZIK
                setValid();
            }
        });
    };
}

function setInvalid() {
    $("#inputID").addClass("is-my-invalid");
    $("#inputID").removeClass("is-valid");
    $("#inputID").removeClass("is-overwrite");
    $('#uploadButton').prop('disabled', true);
    $('#uploadButton').removeClass('btn-warning');
    $('#uploadButton').text('ÉRVÉNYTELEN ADATOK');
}

function setValid() {
    $("#inputID").addClass("is-valid");
    $("#inputID").removeClass("is-overwrite");
    $("#inputID").removeClass("is-my-invalid");
    $('#uploadButton').prop('disabled', false);
    $('#uploadButton').removeClass('btn-warning');
    $('#uploadButton').text('TERMÉK RÖGZÍTÉSE');
}
function setOverwrite() {
    $("#inputID").removeClass("is-valid");
    $("#inputID").addClass("is-overwrite");
    $("#inputID").removeClass("is-my-invalid");
    alert('Létező cikkszám, a termék minden adata felülírásra kerül!');
    $('#uploadButton').prop('disabled', false);
    $('#uploadButton').text('TERMÉK FELÜLÍRÁSA');
    $('#uploadButton').addClass('btn-warning');
}
