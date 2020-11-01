


/* document.addEventListener('keydown', function() {
     if (event.keyCode == 123) {
      alert("This function has been disabled to prevent you from stealing my code!");
      return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
      alert("This function has been disabled to prevent you from stealing my code!");
      return false;
    } else if (event.ctrlKey && event.keyCode == 85) {
      alert("This function has been disabled to prevent you from stealing my code!");
      return false;
    }
  }, false);
  
  if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
      alert("This function has been disabled to prevent you from stealing my code!");
      e.preventDefault();
    }, false);
  } else {
    document.attachEvent('oncontextmenu', function() {
      alert("This function has been disabled to prevent you from stealing my code!");
      window.event.returnValue = false;
    });
  }
*/
$(document).ready(function () {
    var productsArray = [];
    var cart = [];
    const shippingCost = 1611;

    const db = firebase.firestore();

    db.collection("products").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var arr = [];
            let id = { id: doc.id };
            arr = doc.data();
            Object.assign(arr, id);
            productsArray.push(arr);
        });
        // Should I put the rest of the code here?

        var productsHTML = '';
        $.each(productsArray, function (index, value) {
            ++index;
            productsHTML += `
        <div class="col mb-4">
        <div class="card h-100 highlight-on-hover" style="box-shadow: 3px 5px 7px darkgrey;">
        <div style="position: relative">
        <a href="productinfo.html">
        <img data-id="${value.id}" src="img/list/${value.mainImage}" onclick="sessionStorage['productID'] = JSON.stringify($(this.dataset)[0].id);" 
        class="card-img-top" alt="">
        </a>
            <span class="product-id">Cikkszám: ${value.id}</span>
            </div>
            <div class="card-body">
                <h5 class="product-name">${value.name}</h5>
            </div>
            <div class="price-cart-container">
            <div class="product-price"> 
        ${formatMoney(value.price)}
            </div>
            <button type="submit" class="btn btn-success btn-basket" data-action="ADD_TO_CART"
                data-name="${value.name}" data-price="${value.price}" data-id="${value.id}" data-button="${value.id}" data-src="${value.mainImage}">
                <i class="fas fa-cart-arrow-down basket-icon"></i>
            </button>
        </div>

            <div class="card-footer">
                <small class="text-muted">${value.motto}</small>
            </div>
        </div>
    </div>`
        })
        $('.products').html(productsHTML);
        outputCart();
        $('#output').on('click', '[data-action="DELETE_ITEM"]', function () {
            var itemInfo = $(this.dataset)[0];
            var that = this;
            var buttonOfProductHTML = document.querySelector(`[data-button='${itemInfo.id}']`);
            var row = this.parentElement.parentElement;
            var itemIndex = $('[data-action="DELETE_ITEM"]').index(that);
            cart.splice(itemIndex, 1);
            sessionStorage['shopCart'] = JSON.stringify(cart);
            handleCartButton(buttonOfProductHTML, 0);
            $(row).fadeOut(500, () => {
                outputCart();
            });
        })

        $('#output').on('change', '.dynamic-quantity', function () {
            var itemInfo = $(this.dataset)[0];
            var button = document.querySelector(`[data-button='${itemInfo.id}']`);
            var itemInCart = false;
            var quantity = $(this).val();
            var removeItem = false;
            var itemToPerish = 0;
            $.each(cart, function (index, value) {
                if (value.id == itemInfo.id) {
                    if (quantity <= 0) {
                        removeItem = true;
                        itemToPerish = index;

                    } else {
                        cart[index].quantity = quantity;
                        itemInCart = true;
                    }
                }
            })
            if (removeItem) {
                cart.splice(itemToPerish, 1);
                var row = this.parentElement.parentElement;
                sessionStorage['shopCart'] = JSON.stringify(cart);
                $(row).fadeOut(500, () => {
                    outputCart();
                });
                handleCartButton(button, quantity);

            } else {
                sessionStorage['shopCart'] = JSON.stringify(cart);
                outputCart();
                handleCartButton(button, quantity);
            }
        })
        $('[data-action="ADD_TO_CART"]').click(function (e) {
            e.preventDefault();
            var itemInfo = $(this.dataset)[0];
            var button = this;
            itemInfo.quantity = 1;
            var itemInCart = false;
            $.each(cart, function (index, value) {
                if (value.id == itemInfo.id) {
                    value.quantity = parseInt(value.quantity) + parseInt(itemInfo.quantity);
                    itemInCart = true;
                    handleCartButton(button, value.quantity);
                }
            })
            if (!itemInCart) {
                cart.push(itemInfo);
                var value = $(this.dataset)[0];
                handleCartButton(button, value.quantity);
            }
            sessionStorage['shopCart'] = JSON.stringify(cart);
            outputCart();
        })

        function outputCart() {
            var footerHTML = '';
            if (sessionStorage['shopCart'] != null) {
                cart = JSON.parse(sessionStorage['shopCart'].toString());
                $.each(cart, function (index, value) {
                    ++index;
                    var button = document.querySelector(`[data-button='${value.id}']`);
                    handleCartButton(button, value.quantity);
                })
                $('#checkout-div').show();
            }
            var bodyHTML = '';
            var indexShipping = 0;
            var total = 0;
            var itemCount = 0;
            if (cart.length != 0) {
                total += parseInt(shippingCost);
            }
            $.each(cart, function (index, value) {
                ++index;
                var subtotal = value.quantity * value.price;
                var buttonID = 1;
                total += subtotal;
                itemCount += parseInt(value.quantity);
                bodyHTML += `
                    <tr>
                        <td class="text-center align-middle">
                        <button class="btn btn-sm btn-danger" data-action="DELETE_ITEM" data-button="${value.id}" data-id="${value.id}" data-buttonid="${index}">
                        <i class="far fa-trash-alt align-middle" style="font-size: 18px;"></i>
                        </button></td>
                        <td class="container-cartImage"><img src="img/list/${value.src}" class="cartImage" alt="${value.name}"></td>
                        <td class="text-left"><input type="hidden" name="item_name_${index}" value="${value.name}" ">${value.name} (#${value.id})</td>
                        <td class="text-center"><input size="2" type="number" data-id="${value.id}" class="dynamic-quantity" name="quantity_${index}" value="${value.quantity}"> db</td>
                        <td class="text-center"><input type="hidden" name="amount_${index}" value="${value.price}">${formatMoney(value.price)}</td>
                        <td class="text-sm-right"><input type="hidden" name="subtotal_${index}" value="${subtotal}">${formatMoney(subtotal)}</td>
                    </tr>`
                indexShipping = index;
                buttonID++;
            })
            indexShipping++;

            let value = {
                name: 'Szállítás',
                id: '000000',
                quantity: parseInt(1),
            }

            bodyHTML += `
        <tr>
            <td class="text-center align-middle"></td>
            <td class="text-center align-middle"></td>
            <td class="text-left"><input type="hidden" name="item_name_${indexShipping}" value="${value.name}">${value.name}</td>
            <td class="text-center"><input type="hidden" data-id="${value.id}" name="quantity_${indexShipping}" value="${value.quantity}">${value.quantity} db</td>
            <td class="text-center"><input type="hidden" name="amount_${indexShipping}" value="${shippingCost}">${formatMoney(shippingCost)}</td>
            <td class="text-sm-right"><input type="hidden" name="subtotal_${indexShipping}" value="${shippingCost}">${formatMoney(shippingCost)}</td>
        </tr>`

            footerHTML += `
                    <tr>
                        <td colspan="5" class="text-sm-right">Összesen:</td>
                        <td class="text-sm-right">${formatMoney(total)}</td>
                    </tr>`
            $('#output').html(bodyHTML);
            $('#table-foot').html(footerHTML);
            $('.items').html(itemCount);
            if (cart.length == 0) {
                $('#checkout-div').hide();
                $(function () {
                    $('#cart-modal').modal('hide');
                    $('#checkout-div').hide();
                });
            }
            addModalFooter();
        }

        function handleCartButton(button, quantity) {
            if (quantity <= 0) {
                button.innerHTML = `<i class="fas fa-cart-arrow-down basket-icon" style="position: relative;">
                                    </i>`;
                button.classList.add('btn-success');
                button.classList.remove('btn-info');
            } else {
                button.innerHTML = `<i class="fas fa-shopping-cart basket-icon" style="position: relative;">
                                        <span class="itemCountEach">
                                        ${parseInt(quantity)}
                                        </span>
                                    </i>`;
                button.classList.remove('btn-success');
                button.classList.add('btn-info');
            }
        }

        function checkout() {
            var indexShipping = 0;
            let paypalFormHTML = `
            <form id="paypal-form" action="https://www.paypal.com/cgi-bin/webscr" method="post">
            <input type="hidden" name="cmd" value="_cart">
            <input type="hidden" name="upload" value="1">
            <input type="hidden" name="business" value="darkarchon1978@outlook.com">
            <input type="hidden" name="currency_code" value="HUF">
            <input type="hidden" name="charset" value="utf-8">
            `;
            cart.forEach((cartItem, index) => {
                ++index;
                paypalFormHTML += `
            <input type="hidden" name="item_name_${index}" value="${cartItem.name} (#${cartItem.id})">
            <input type="hidden" name="amount_${index}" value="${cartItem.price}">
            <input type="hidden" name="quantity_${index}" value="${cartItem.quantity}">`
                indexShipping = index;
            });
            indexShipping++;
            let value = {
                name: 'Szállítás',
                quantity: parseInt(1),
            }
            paypalFormHTML += `
        <input type="hidden" name="item_name_${indexShipping}" value="${value.name}">
        <input type="hidden" name="quantity_${indexShipping}" value="${value.quantity}">
        <input type="hidden" name="amount_${indexShipping}" value="${shippingCost}">`
            paypalFormHTML += `
            <input type="submit" style="display: none" value="PAYPAL FIZETÉS">
            </form>`;
            document.querySelector('body').insertAdjacentHTML('beforeend', paypalFormHTML);
            document.getElementById('paypal-form').submit();

        }

        function addModalFooter() {
            var modalFooterHTML = `
            <a href="products.html" class="btn btn-block btn-lg btn-warning"
            data-dismiss="modal">VÁSÁRLÁS FOLYTATÁSA</a>
            <input id="checkoutButton" type="submit" data-action="CHECKOUT" value="PAYPAL FIZETÉS"
            class="btn btn-primary btn-lg btn-block">
            `
            $('.modal-footer').html(modalFooterHTML);
            document.querySelector('[data-action="CHECKOUT"]').addEventListener('click', () => checkout());
        }

        function formatMoney(n) {
            return Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF', minimumFractionDigits: 0 }).format(n)
        }

        /*     function fade(element) {
                var op = 1;  // initial opacity
                var timer = setInterval(function () {
                    if (op <= 0.1) {
                        clearInterval(timer);
                        element.style.display = 'none';
                    }
                    element.style.opacity = op;
                    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                    op -= op * 0.1;
                }, 50);
            }
         */
    })
});