var storage = firebase.storage();
var pathReference = storage.ref('list/202010.jpg');

// Get the download URL
pathReference.getDownloadURL().then(function(url) {
  // Insert url into an <img> tag to "download"
  var img = document.getElementById('test');
  img.src = url;
  console.log(url)
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

productsHTML = `
        <div class="col mb-4">
        <div class="card h-100 highlight-on-hover" style="box-shadow: 3px 5px 7px darkgrey;">
        <div style="position: relative">
        <a href="productinfo.html">
        <img onclick="sessionStorage['productID'] = JSON.stringify($(this.dataset)[0].id);" 
        class="card-img-top" alt="">
        </a>
            <span class="product-id">Cikkszám: </span>
            </div>
            <div class="card-body">
                <h5 class="product-name"></h5>
            </div>
            <div class="price-cart-container">
            <div class="product-price"> 
        
            </div>
            <button type="submit" class="btn btn-success btn-basket" data-action="ADD_TO_CART"
                data-name="" data-price="" data-id="" data-button="" data-src="">
                <i class="fas fa-cart-arrow-down basket-icon"></i>
            </button>
        </div>

            <div class="card-footer">
                <small class="text-muted"></small>
            </div>
        </div>
    </div>`