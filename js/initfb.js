var productsArray = [];

const db = firebase.firestore();

db.collection("products").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        var arr = [];
        let id = {id: doc.id};
        arr = doc.data();
        Object.assign(arr, id);
        productsArray.push(arr);
    });
    // Should I put the rest of the code here?
});

