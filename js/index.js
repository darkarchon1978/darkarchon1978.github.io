'use strict';

/* function selectCard(btn) {
    let card = btn.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    console.log(card);
    
} */

let cart = [];
const cartDOM = document.querySelector('.cart')
const addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');
addToCartButtonsDOM.forEach(addToCartButtonDOM => {
    addToCartButtonDOM.addEventListener('click', () => {
        const productDOM = addToCartButtonDOM.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        const product = {
            image: productDOM.querySelector('.card-img-top').getAttribute('src'),
            name: productDOM.querySelector('.product-name').innerText,
            price: productDOM.querySelector('.product-price').innerText,
            quantity: 1,
        };

        cartDOM.insertAdjacentHTML('beforeend', `
        <div class="cart__item">
          <img class="cart__item__image" src="${product.image}" alt="${product.name}">
          <p class="cart-item-name">${product.name}</p>
          <p class="cart-item-price">${product.price}</p>
          <div class="btn-group btn-group-sm">
          <button class="btn-secondary btn" data-action="DECREASE_ITEM">
          <i class="fas fa-minus"></i>
          </button>
          <span class="btn-light btn cart-quantity">
          <span class="cart-item-quantity">${product.quantity}</span>
          </span>
          <button class="btn-primary btn" data-action="INCREASE_ITEM">
          <i class="fas fa-plus"></i>
          </i>
          </button>
          </div>
          <button class="btn btn-sm btn-danger" data-action="DELETE_ITEM">
          <i class="far fa-trash-alt align-middle" style="font-size: 18px;"></i>
          </button>
        </div>
      `);
        cart.push(product);
        addToCartButtonDOM.parentElement.innerHTML = `<div type="submit" class="btn btn-secondary disabled">
        <i class="fas fa-cart-plus basket-icon"></i>
    </div>`
        const cartItemsDOM = cartDOM.querySelectorAll('.cart__item');
        cartItemsDOM.forEach(cartItemDOM => {
            if (cartItemDOM.querySelector('.cart-item-name').innerText === product.name) {
                cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]').addEventListener('click', () => {
                    cart.forEach(cartItem => {
                        if (cartItem.name === product.name) {
                            let quantityInEach = cartItemDOM.querySelector('.cart-item-quantity').innerText;
                            if (cartItemDOM.querySelector('.cart-item-quantity').innerText == 5) {
                                alert("Ebből a termékből nem helyezhet többet a kosárba!");
                            } else {
                                cartItemDOM.querySelector('.cart-item-quantity').innerText = ++cartItem.quantity;
                            }
                        }
                    })
                });
            }
        });

    });
});