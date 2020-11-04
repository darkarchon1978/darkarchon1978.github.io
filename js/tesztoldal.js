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
});