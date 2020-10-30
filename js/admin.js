function getFireBaseData() {
    var productsArray = [];
    const db = firebase.firestore();
    setFields();
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
                    <button class="btn btn-sm btn-danger" data-action="DELETE_ITEM">
                    <i class="far fa-trash-alt align-middle" style="font-size: 18px;"></i>
                    </button></td>
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

{/* <th class="text-center">Törlés</th>
            <th class="text-center">Kép</th>
            <th class="text-center">Megnevezés</th>
            <th class="text-center">Leírás</th>
            <th class="text-center">Mottó</th>
            <th class="text-center">Ár</th>
            <th class="text-center">Képek Száma</th> */}

function setFields() {
    document.getElementById('get-div').style.display = "none";
    document.getElementById('filler-left').classList.replace('col-md-4', 'col-xl-2');
    document.getElementById('maincontent').classList.replace('col-md-4', 'col-xl-8');
    document.getElementById('filler-right').classList.replace('col-md-4', 'col-xl-2');
    document.getElementById('adminTable').style.display = 'table';
}