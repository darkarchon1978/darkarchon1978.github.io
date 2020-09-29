'use strict';

let cart = (JSON.parse(localStorage.getItem('cart')) || []);
const cartDOM = document.querySelector('.cart')
const addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');

if (cart.length > 0) {
    cart.forEach(product => {
        insertItemToDOM(product);
        countCartTotal();
        addToCartButtonsDOM.forEach(addToCartButtonDOM => {
            handleActionButtons(addToCartButtonDOM, product);
        });
    });
}

addToCartButtonsDOM.forEach(addToCartButtonDOM => {
    addToCartButtonDOM.addEventListener('click', () => {
        const productDOM = addToCartButtonDOM.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        const product = {
            image: productDOM.querySelector('.card-img-top').getAttribute('src'),
            name: productDOM.querySelector('.product-name').innerText,
            price: productDOM.querySelector('.product-price').innerText.replace(' ', '').replace('Ft', ''),
            quantity: 1,
        };
        insertItemToDOM(product);
        cart.push(product);
        saveCart();
        addToCartButtonDOM.innerHTML = `<i class="fas fa-cart-arrow-down basket-icon"></i>`;
        addToCartButtonDOM.disabled = true;
        addToCartButtonDOM.classList.add('btn-secondary')
        handleActionButtons(addToCartButtonDOM, product);
    });
});

function insertItemToDOM(product) {
    cartDOM.insertAdjacentHTML('beforeend', `
        <div class="cart__item">
          <img class="cart__item__image" src="${product.image}" alt="${product.name}">
          <p class="cart-item-name">${product.name}</p>
          <p class="cart-item-price">${product.price}</p>
          <div class="btn-group btn-group-sm">
          <button class="btn btn-sm btn-danger" data-action="DELETE_ITEM">
          <i class="far fa-trash-alt align-middle" style="font-size: 18px;"></i>
          </button>
          <span class="btn-group-connect cart-quantity">
          </span>
          <button class="btn-secondary btn${(product.quantity === 1 ? ' btn-danger' : '')}" data-action="DECREASE_ITEM">
          <i class="fas fa-minus"></i>
          </button>
          <span class="btn-group-connect cart-quantity">
          <span class="cart-item-quantity">${product.quantity}</span>
          </span>
          <button class="btn-primary btn" data-action="INCREASE_ITEM">
          <i class="fas fa-plus"></i>
          </i>
          </button>
          </div>
        </div>
      `);

    addCartFooter();
}

function handleActionButtons(addToCartButtonDOM, product) {
    const productDOM = addToCartButtonDOM.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    if (productDOM.querySelector('.product-name').innerText === product.name) {
        addToCartButtonDOM.innerHTML = `<i class="fas fa-cart-arrow-down basket-icon"></i>`;
        addToCartButtonDOM.disabled = true;
        addToCartButtonDOM.classList.add('btn-secondary');
        const cartItemsDOM = cartDOM.querySelectorAll('.cart__item');
        cartItemsDOM.forEach(cartItemDOM => {
            if (cartItemDOM.querySelector('.cart-item-name').innerText === product.name) {

                cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]').addEventListener('click', () => increaseItem(product, cartItemDOM));

                cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').addEventListener('click', () => decreaseItem(product, cartItemDOM, addToCartButtonDOM));

                cartItemDOM.querySelector('[data-action="DELETE_ITEM"]').addEventListener('click', () => removeItem(product, cartItemDOM, addToCartButtonDOM));
            }
        });
    };
};

function increaseItem(product, cartItemDOM) {
    cart.forEach(cartItem => {
        if (cartItem.name === product.name) {
            if (cartItem.quantity == 5) {
                alert("Ebből a termékből nem helyezhet többet a kosárba!");
            } else {
                cartItemDOM.querySelector('.cart-item-quantity').innerText = ++cartItem.quantity;
                saveCart();
                cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.remove('btn-danger')
            }
        }
    })
};

function decreaseItem(product, cartItemDOM, addToCartButtonDOM) {
    cart.forEach(cartItem => {
        if (cartItem.name === product.name) {
            if (cartItem.quantity > 1) {
                cartItemDOM.querySelector('.cart-item-quantity').innerText = --cartItem.quantity;
                saveCart();
            } else {
                removeItem(product, cartItemDOM, addToCartButtonDOM);
            }
            if (cartItem.quantity === 1) {
                cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.add('btn-danger')
            }
        }
    })
};

function removeItem(product, cartItemDOM, addToCartButtonDOM) {
    cartItemDOM.classList.add('cart__item--removed');
    setTimeout(() => cartItemDOM.remove(), 450);
    cart = cart.filter(cartItem => cartItem.name !== product.name);
    saveCart();
    addToCartButtonDOM.innerHTML = `<i class="fas fa-cart-arrow-down basket-icon"></i>`;
    addToCartButtonDOM.disabled = false;
    addToCartButtonDOM.classList.remove('btn-secondary');
    if (cart.length < 1) {
        document.querySelector('.cart-footer').remove();
    }
};

function addCartFooter() {
    if (document.querySelector('.cart-footer') === null) {
        cartDOM.insertAdjacentHTML('afterend', `
          <div class="cart-footer">
          <button class="btn btn-danger" data-action="CLEAR_CART">Kosár Ürítése</button>
          <button class="btn btn-primary" data-action="CHECKOUT">Megrendelés</button>
          </div>
          `);
        document.querySelector('[data-action="CLEAR_CART"]').addEventListener('click', () => clearCart());
        document.querySelector('[data-action="CHECKOUT"]').addEventListener('click', () => checkout());
    }

}

function clearCart() {
    cartDOM.querySelectorAll('.cart__item').forEach(cartItemDOM => {
        cartItemDOM.classList.add('cart__item--removed');
        setTimeout(() => cartItemDOM.remove(), 450);
    });
    cart = [];
    saveCart();
    document.querySelector('.cart-footer').remove();
    addToCartButtonsDOM.forEach(addToCartButtonDOM => {
        addToCartButtonDOM.innerHTML = `<i class="fas fa-cart-arrow-down basket-icon"></i>`;
        addToCartButtonDOM.disabled = false;
        addToCartButtonDOM.classList.remove('btn-secondary');
    })
}

function checkout() {
    let paypalFormHTML = `
<form id="paypal-form" action="https://www.paypal.com/cgi-bin/webscr" method="post">
<input type="hidden" name="cmd" value="_cart">
<input type="hidden" name="upload" value="1">
<input type="hidden" name="business" value="darkarchon1978@yahoo.com">
<input type="hidden" name="currency_code" value="HUF">
`;
    cart.forEach((cartItem, index) => {
        ++index;
        paypalFormHTML += `
            <input type="hidden" name="item_name_${index}" value="${cartItem.name}">
            <input type="hidden" name="amount_${index}" value="${cartItem.price}">
            <input type="hidden" name="quantity_${index}" value="${cartItem.quantity}">
    `;
    });
    paypalFormHTML += `
    <input type="submit" value="PayPal">
    </form>
    <div class="overlay"></div>
`;
document.querySelector('body').insertAdjacentHTML('beforeend', paypalFormHTML);
document.getElementById('paypal-form').submit();
}

function countCartTotal() {
    let cartTotal = 0;
    cart.forEach(cartItem => cartTotal = cartTotal + (cartItem.quantity * cartItem.price));
    cartTotal = new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF', minimumFractionDigits: 0 }).format(cartTotal);
    document.querySelector('[data-action="CHECKOUT"]').innerText = 'Megrendelem: ' + cartTotal
}
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    countCartTotal();
    
}

function reverseFormatNumber(val,locale){
    var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '');
    var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '');
    var reversedVal = val.replace(new RegExp('\\' + group, 'g'), '');
    reversedVal = reversedVal.replace(new RegExp('\\' + decimal, 'g'), '.');
    return Number.isNaN(reversedVal)?0:reversedVal;
}
