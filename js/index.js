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
          <button class="btn-secondary btn btn-danger" data-action="DECREASE_ITEM">
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
        addToCartButtonDOM.innerHTML = `<svg id="Capa_1" enable-background="new 0 0 512 512" height="36" viewBox="0 0 512 512" width="36" xmlns="http://www.w3.org/2000/svg"><g><path d="m407 16c-57.891 0-105 47.109-105 105s47.109 105 105 105 105-47.109 105-105-47.109-105-105-105zm45 120h-30v30h-30v-30h-30v-30h30v-30h30v30h30z"/><path d="m137 376c8.3 0 292.767 0 281.602 0l33.252-128.247c-10.422 3.702-21.396 6-32.807 7.029l-.315 1.218h-70.437l1.117-13.391c-10.366-4.933-19.834-11.239-28.546-18.532l-2.661 31.923h-62.41l-5.001-60h44.059c-6.172-9.201-10.779-19.396-14.561-30h-141.261l-20.004-90h-119.027v30h94.974l53.32 240h-11.294c-24.814 0-45 20.186-45 45s20.186 45 45 45h17.763c-1.681 4.715-2.763 9.716-2.763 15 0 24.814 20.186 45 45 45s45-20.186 45-45c0-5.284-1.082-10.285-2.763-15h65.526c-1.681 4.715-2.763 9.716-2.763 15 0 24.814 20.186 45 45 45s45-20.186 45-45c0-5.284-1.082-10.285-2.763-15h32.763v-30h-285c-8.276 0-15-6.724-15-15s6.724-15 15-15zm208.795-90h65.158l-15.555 60h-54.604zm-30.09 0-5.001 60h-47.41l-5.001-60zm-82.5 60h-54.168l-13.336-60h62.503zm-87.507-150h75.007l5.001 60h-66.671zm66.302 255c0 8.276-6.724 15-15 15s-15-6.724-15-15 6.724-15 15-15 15 6.724 15 15zm150 0c0 8.276-6.724 15-15 15s-15-6.724-15-15 6.724-15 15-15 15 6.724 15 15z"/></g></svg>`;
        addToCartButtonDOM.disabled = true;
        addToCartButtonDOM.classList.add('btn-secondary')
/*         addToCartButtonDOM.parentElement.innerHTML = `<div type="submit" class="btn btn-secondary disabled">
        <i class="fas fa-cart-plus basket-icon"></i>
    </div>`
 */        const cartItemsDOM = cartDOM.querySelectorAll('.cart__item');
        cartItemsDOM.forEach(cartItemDOM => {
            if (cartItemDOM.querySelector('.cart-item-name').innerText === product.name) {

                cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]').addEventListener('click', () => {
                    cart.forEach(cartItem => {
                        if (cartItem.name === product.name) {

                            if (cartItem.quantity == 5) {
                                alert("Ebből a termékből nem helyezhet többet a kosárba!");
                            } else {
                                cartItemDOM.querySelector('.cart-item-quantity').innerText = ++cartItem.quantity;
                                cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.remove('btn-danger')
                            }
                        }
                    })
                });
                cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').addEventListener('click', () => {

                    cart.forEach(cartItem => {
                        if (cartItem.name === product.name) {
                            if (cartItem.quantity > 1) {
                                cartItemDOM.querySelector('.cart-item-quantity').innerText = --cartItem.quantity;
                            } else {
                                cartItemDOM.classList.add('cart__item--removed');
                                setTimeout(() => cartItemDOM.remove(), 250);
                                cart = cart.filter(cartItem => cartItem.name !== product.name);
                                addToCartButtonDOM.innerHTML = `<svg id="Capa_1" enable-background="new 0 0 512 512" height="36" viewBox="0 0 512 512" width="36" xmlns="http://www.w3.org/2000/svg"><g><path d="m407 16c-57.891 0-105 47.109-105 105s47.109 105 105 105 105-47.109 105-105-47.109-105-105-105zm45 120h-30v30h-30v-30h-30v-30h30v-30h30v30h30z"/><path d="m137 376c8.3 0 292.767 0 281.602 0l33.252-128.247c-10.422 3.702-21.396 6-32.807 7.029l-.315 1.218h-70.437l1.117-13.391c-10.366-4.933-19.834-11.239-28.546-18.532l-2.661 31.923h-62.41l-5.001-60h44.059c-6.172-9.201-10.779-19.396-14.561-30h-141.261l-20.004-90h-119.027v30h94.974l53.32 240h-11.294c-24.814 0-45 20.186-45 45s20.186 45 45 45h17.763c-1.681 4.715-2.763 9.716-2.763 15 0 24.814 20.186 45 45 45s45-20.186 45-45c0-5.284-1.082-10.285-2.763-15h65.526c-1.681 4.715-2.763 9.716-2.763 15 0 24.814 20.186 45 45 45s45-20.186 45-45c0-5.284-1.082-10.285-2.763-15h32.763v-30h-285c-8.276 0-15-6.724-15-15s6.724-15 15-15zm208.795-90h65.158l-15.555 60h-54.604zm-30.09 0-5.001 60h-47.41l-5.001-60zm-82.5 60h-54.168l-13.336-60h62.503zm-87.507-150h75.007l5.001 60h-66.671zm66.302 255c0 8.276-6.724 15-15 15s-15-6.724-15-15 6.724-15 15-15 15 6.724 15 15zm150 0c0 8.276-6.724 15-15 15s-15-6.724-15-15 6.724-15 15-15 15 6.724 15 15z"/></g></svg>`;
                                addToCartButtonDOM.disabled = false;
                                addToCartButtonDOM.classList.remove('btn-secondary')
                            }
                            if (cartItem.quantity ===1) {
                                cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.add('btn-danger')
                            }
                        }
                    })
                });
                cartItemDOM.querySelector('[data-action="DELETE_ITEM"]').addEventListener('click', () => {

                    cart.forEach(cartItem => {
                        if (cartItem.name === product.name) {
                                cartItemDOM.classList.add('cart__item--removed');
                                setTimeout(() => cartItemDOM.remove(), 250);
                                cart = cart.filter(cartItem => cartItem.name !== product.name);
                                addToCartButtonDOM.innerHTML = `<svg id="Capa_1" enable-background="new 0 0 512 512" height="36" viewBox="0 0 512 512" width="36" xmlns="http://www.w3.org/2000/svg"><g><path d="m407 16c-57.891 0-105 47.109-105 105s47.109 105 105 105 105-47.109 105-105-47.109-105-105-105zm45 120h-30v30h-30v-30h-30v-30h30v-30h30v30h30z"/><path d="m137 376c8.3 0 292.767 0 281.602 0l33.252-128.247c-10.422 3.702-21.396 6-32.807 7.029l-.315 1.218h-70.437l1.117-13.391c-10.366-4.933-19.834-11.239-28.546-18.532l-2.661 31.923h-62.41l-5.001-60h44.059c-6.172-9.201-10.779-19.396-14.561-30h-141.261l-20.004-90h-119.027v30h94.974l53.32 240h-11.294c-24.814 0-45 20.186-45 45s20.186 45 45 45h17.763c-1.681 4.715-2.763 9.716-2.763 15 0 24.814 20.186 45 45 45s45-20.186 45-45c0-5.284-1.082-10.285-2.763-15h65.526c-1.681 4.715-2.763 9.716-2.763 15 0 24.814 20.186 45 45 45s45-20.186 45-45c0-5.284-1.082-10.285-2.763-15h32.763v-30h-285c-8.276 0-15-6.724-15-15s6.724-15 15-15zm208.795-90h65.158l-15.555 60h-54.604zm-30.09 0-5.001 60h-47.41l-5.001-60zm-82.5 60h-54.168l-13.336-60h62.503zm-87.507-150h75.007l5.001 60h-66.671zm66.302 255c0 8.276-6.724 15-15 15s-15-6.724-15-15 6.724-15 15-15 15 6.724 15 15zm150 0c0 8.276-6.724 15-15 15s-15-6.724-15-15 6.724-15 15-15 15 6.724 15 15z"/></g></svg>`;
                                addToCartButtonDOM.disabled = false;
                                addToCartButtonDOM.classList.remove('btn-secondary')
                        }
                    })
                });
            }
        });

    });
});