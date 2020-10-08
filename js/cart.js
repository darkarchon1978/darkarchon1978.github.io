var cart = [];
$(document).ready(function () {
    outputCart();
    if (cart.length == 0) {
        $('#checkout-div').hide();
    };
    $('#output').on('click','[data-action="DELETE_ITEM"]', function() {
        var itemIndex = $('[data-action="DELETE_ITEM"]').index(this);
        cart.splice(itemIndex, 1);
        sessionStorage['shopCart'] = JSON.stringify(cart);
        outputCart();
    })
    $('[data-action="ADD_TO_CART"]').click(function (e) {
        e.preventDefault();
        var itemInfo = $(this.dataset)[0];
        itemInfo.quantity = 1;
        var itemInCart = false;
        $.each(cart, function (index, value) {
            if (value.id == itemInfo.id) {
                value.quantity = parseInt(value.quantity) + parseInt(itemInfo.quantity);
                itemInCart = true;
            }
        })
        if (!itemInCart) {
            cart.push(itemInfo);
        }
        sessionStorage['shopCart'] = JSON.stringify(cart);
        outputCart();
    })
    
    function outputCart() {
        var footerHTML = '';
        if (sessionStorage['shopCart'] != null) {
            cart = JSON.parse(sessionStorage['shopCart'].toString());
            console.log(cart);
            $('#checkout-div').show();
        }

        var bodyHTML = '';
        var total = 0;
        if (cart.length != 0) {
            total += 1000;
        }
        var itemCount = 0;
        $.each(cart, function (index, value) {
            var subtotal = value.quantity * value.price;
            total += subtotal;
            itemCount += parseInt(value.quantity);
            bodyHTML += `
                    <tr>
                        <td class="text-center align-middle">
                        <button class="btn btn-sm btn-danger" data-action="DELETE_ITEM">
                        <i class="far fa-trash-alt align-middle" style="font-size: 18px;"></i>
                        </button></td>
                        <td>${value.name}</td>
                        <td class="text-center">${value.quantity} db</td>
                        <td class="text-center">${formatMoney(value.price)}</td>
                        <td class="text-sm-right">${formatMoney(subtotal)}</td>
                    </tr>`
        })
        
        footerHTML += `
                    <tr>
                        <td colspan="4" class="text-sm-right">Összesen:</td>
                        <td class="text-sm-right">${formatMoney(total)}</td>
                    </tr>`
        $('#output').html(bodyHTML);
        $('#table-foot').html(footerHTML);
        // $('.total').html(formatMoney(total));
        $('.items').html(itemCount);
        if (cart.length == 0) {
            $('#checkout-div').hide();
            $(function () {
                $('#cart').modal('hide');
                $('#payButton').hide();
             });
        } else {
            $(function () {
                $('#payButton').show();
             })
        }
    }

    function formatMoney(n) {
        return Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF', minimumFractionDigits: 0 }).format(n)
    }

})