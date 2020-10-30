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
        // Táblázatsorok generálása
        let outputAdminHTML = '';
        $.each(productsArray, function (index, value) {
            ++index;
            outputAdminHTML += `
                <tr>
                    <td class="text-center align-middle">
                    <div class="btn-group">
                    <button class="btn btn-sm btn-danger" data-action="DELETE_ITEM">
                    <i class="far fa-trash-alt align-middle" style="font-size: 24px;"></i>
                    </button>
                    <button class="btn btn-sm btn-info" data-action="EDIT_ITEM">
                    <i class="far fa-edit" style="font-size: 24px;"></i>
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

        // Törlés kezelés
        $('#outputAdmin').on('click', '[data-action="DELETE_ITEM"]', function () {
            alert('Ezt most ne!')
            // Modal kezelés - biztos-e benne?
        });


    });

}

// Adatfelvitel HTML létrehozása
function createFireBaseData() {
    setFields();
    let createProductHTML = `
    <div class="form-row">
    <div class="form-group col-md-2">
        
        <div class="input-group">
            <input type="text" placeholder="Cikkszám" id="inputID" class="form-control">
            <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button">
            <i class="far fa-question-circle" style="font-size: 24px;"></i></button>    
            </div>
        </div>
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
    <div id="uploadButton" class="btn btn-block btn-success">FELTÖLTÉS</div>`
    $('#createProduct').html(createProductHTML);
}

function setFields() {
    document.getElementById('get-div').style.display = "none";
    document.getElementById('filler-left').classList.replace('col-md-4', 'col-xl-2');
    document.getElementById('maincontent').classList.replace('col-md-4', 'col-xl-8');
    document.getElementById('filler-right').classList.replace('col-md-4', 'col-xl-2');
}