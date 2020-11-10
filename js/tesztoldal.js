var storage = firebase.storage();

// Create a reference under which you want to list
var listRef = storage.ref('products');

let thumbnailHTML = ''
let index = 0;

// Find all the prefixes and items.
listRef.listAll().then(function (res) {
  res.prefixes.forEach(function (folderRef) {
    // All the prefixes under listRef.
    // You may call listAll() recursively on them.
  });
  res.items.forEach(function (itemRef) {
    itemRef.getDownloadURL().then(function (url) {
      thumbnailHTML = `
      <img id="${index}" class="img-thumbnail">
      `;
      $('#thumbnail-div').append(thumbnailHTML)
      $('#' + index).attr('src', url);
      index++;
      // $('img').attr('src', url);
    }).catch(function (error) {
      console.log('Hiba: ', error);
    });
    // All the items under listRef.
  });
}).catch(function (error) {
  // Uh-oh, an error occurred!
});

$('#thumbnail-div').on('click', 'img', function () {
  console.log('HEURÉKA!')
});