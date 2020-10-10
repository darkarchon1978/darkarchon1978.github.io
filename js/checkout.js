'use strict'

var cart = [];

$(document).ready(function () {
    outputCart();
    $('#output').on('click', '[data-action="DELETE_ITEM"]', function () {
        var itemIndex = $('[data-action="DELETE_ITEM"]').index(this);
        cart.splice(itemIndex, 1);
        sessionStorage['shopCart'] = JSON.stringify(cart);
        outputCart();
    })
    $('#output').on('change', '.dynamic-quantity', function () {
        var itemInfo = $(this.dataset)[0];
        var button = document.querySelector(`[data-id='${itemInfo.id}']`);
        var itemInCart = false;
        var quantity = $(this).val();
        var removeItem = false;
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
        }
        sessionStorage['shopCart'] = JSON.stringify(cart);
        outputCart();
        handleCartButton(button, quantity);
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
            // alert('A termék belekerült a kosárba!');
            handleCartButton(button, value.quantity);

        }
        sessionStorage['shopCart'] = JSON.stringify(cart);
        outputCart();

    })
    function outputCart() {
        var footerHTML = '';
        if (sessionStorage['shopCart'] != null) {
            cart = JSON.parse(sessionStorage['shopCart'].toString());
            $('#checkout-div').show();
        }
        var bodyHTML = '';
        var indexShipping = 0;
        var total = 0;
        var itemCount = 0;
        var shippingCost = 1000;
        if (cart.length != 0) {
            total += shippingCost;
        }
        $.each(cart, function (index, value) {
            ++index;
            var subtotal = value.quantity * value.price;
            total += subtotal;
            itemCount += parseInt(value.quantity);
            bodyHTML += `
                    <tr>
                        <td class="text-center align-middle">
                        <button class="btn btn-sm btn-danger" data-action="DELETE_ITEM">
                        <i class="far fa-trash-alt align-middle" style="font-size: 18px;"></i>
                        </button></td>
                        <td class="text-left"><input type="hidden" name="item_name_${index}" value="${value.name}">${value.name}</td>
                        <td class="text-center"><input size="5" type="number" data-id="${value.id}" class="dynamic-quantity" name="quantity_${index}" value="${value.quantity}"> db</td>
                        <td class="text-center"><input type="hidden" name="amount_${index}" value="${value.price}">${formatMoney(value.price)}</td>
                        <td class="text-sm-right"><input type="hidden" name="subtotal_${index}" value="${subtotal}">${formatMoney(subtotal)}</td>
                    </tr>`
            indexShipping = index;
        })
        indexShipping++;
        let value = {
            name: 'Szállítás',
            id: '000000',
            quantity: 1,
        }

        bodyHTML += `
        <tr>
            <td class="text-center align-middle"></td>
            <td class="text-left"><input type="hidden" name="item_name_${indexShipping}" value="${value.name}">${value.name}</td>
            <td class="text-center"><input type="hidden" data-id="${value.id}" class="dynamic-quantity" name="quantity_${indexShipping}" value="${value.quantity}">${value.quantity} db</td>
            <td class="text-center"><input type="hidden" name="amount_${indexShipping}" value="${shippingCost}">${formatMoney(shippingCost)}</td>
            <td class="text-sm-right"><input type="hidden" name="subtotal_${indexShipping}" value="${shippingCost}">${formatMoney(shippingCost)}</td>
        </tr>`

        footerHTML += `
                    <tr>
                        <td colspan="4" class="text-sm-right">Összesen:</td>
                        <td class="text-sm-right">${formatMoney(total)}</td>
                    </tr>`
        $('#output').html(bodyHTML);
        $('#table-foot').html(footerHTML);
        $('.items').html(itemCount);
        if (cart.length == 0) {
            $('#checkout-div').hide();
            $(function () {
                $('#cart').modal('hide');
                $('#checkout-div').hide();
            });
        }
    }

    function handleCartButton(button, quantity) {
        button.innerHTML = `<i class="fas fa-shopping-cart basket-icon" style="position: relative;">
                                    <span class="itemCountEach">
                                    ${parseInt(quantity)}
                                    </span>
                                </i>`;
        button.classList.remove('btn-success');
        button.classList.add('btn-info');
    }

    function formatMoney(n) {
        return Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF', minimumFractionDigits: 0 }).format(n)
    }

})