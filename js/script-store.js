const navCart = document.getElementById('nav-cart');
const cart = document.getElementById('cart');
const addToCart = document.getElementsByClassName('add-to-cart');
let payAmount = parseInt(document.getElementById('pay-amount').innerText); /* Total Amount Sum */

navCart.addEventListener('click', (e) => {
    navCart.classList.toggle('active');
    cart.classList.toggle('active');
});

/* "ADD TO CART" by finding 'click' event through Event Bubbling! */
document.getElementById('ul-products').addEventListener('click', (e) => {
    e.preventDefault();
    
    if(e.target.tagName == "BUTTON" && e.target.className == "add-to-cart") {
        let item = e.target.parentElement.previousElementSibling.innerText;
        let price = e.target.previousElementSibling.innerText;
    
        /* checking if the item already exists in the cart */
        let flag = 0;
        let xInCart = document.getElementsByClassName('cart-row');
        for(let i=0; i<xInCart.length; i++) {
            if(item == xInCart[i].id) {
                flag = 1;
                break;
            }
        }

        if(flag === 0) {
            let divCartItems = document.getElementsByClassName('cart-items');
    
            let divCartRow = document.createElement('div');
            divCartRow.className = "cart-row";
            divCartRow.id = `${item}`;
        
            // item
            let spanItem = document.createElement('span');
            spanItem.className = "cart-item cart-column";
            let spanItem_Name = document.createElement('span');
            spanItem_Name.innerText = item; // stores in the Item Name
            spanItem.appendChild(spanItem_Name);
        
            // price
            let spanPrice = document.createElement('span');
            spanPrice.className = "cart-price cart-column";
            spanPrice.innerText = price; // stores in the Price
        
            // quantity
            let spanQuantity = document.createElement('span');
            spanQuantity.className = "cart-quantity cart-column";
            spanQuantity.innerText = "x";
            let inputQuantity = document.createElement('input');
            inputQuantity.type = "number";
            inputQuantity.name = "quantity";
            inputQuantity.value = "1";
            inputQuantity.min = "1";
            inputQuantity.max = "5";
            /* quantity change ~ price change; updating Total Amount Sum */
            inputQuantity.addEventListener('click', quantityChangeOrRemove_PriceChange);
            spanQuantity.appendChild(inputQuantity);
        
            // remove button
            let divRemove = document.createElement('div');
            divRemove.className = "cart-remove";
            let buttonRemove = document.createElement('button');
            buttonRemove.type = "submit";
            buttonRemove.name = "remove";
            buttonRemove.id = "remove";
            buttonRemove.innerText = "REMOVE";
            divRemove.appendChild(buttonRemove);
        
            divCartRow.appendChild(spanItem);
            divCartRow.appendChild(spanPrice);
            divCartRow.appendChild(spanQuantity);
            divCartRow.appendChild(divRemove);
        
            divCartItems[0].appendChild(divCartRow);

            /* Total Amount Sum */
            let itemPrice = parseInt(price.split('₹')[1]);
            payAmount = payAmount + itemPrice; // update #1
            document.getElementById('pay-amount').innerText = payAmount; // update #2

            /* Toast Notification */
            let divNotificationContainer = document.getElementsByClassName('notification-container')[0];
            let divContainer = document.createElement('div');
            let spanItemName = document.createElement('span');
            spanItemName.id = 'notification-item-name';
            spanItemName.innerText = item;
            let spanText = document.createElement('span');
            spanText.innerText = ' HAS BEEN ADDED TO CART';
            let divNotification = document.createElement('div');
            divNotification.id = 'notification';
            divNotification.appendChild(spanItemName);
            divNotification.appendChild(spanText);
            divContainer.appendChild(divNotification);
            divNotificationContainer.appendChild(divContainer);

            setTimeout(() => divContainer.remove(), 5000);
        }
        else {
            alert('ALREADY ADDED TO CART!');
        }
    }
});

/* "REMOVE" (from cart) by finding 'click' event through Event Bubbling! */
document.getElementsByClassName('cart-items')[0].addEventListener('click', (e) => {
    e.preventDefault();
    
    if(e.target.tagName == "BUTTON" && e.target.id == "remove") {
        let buttonRemove = e.target;
        let divCartRow = buttonRemove.parentElement.parentElement;
        divCartRow.remove();
        quantityChangeOrRemove_PriceChange();
    }
});

/* change in quantity or remove => change in Total Amount Sum */
function quantityChangeOrRemove_PriceChange() {

    payAmount = 0; // resetting Total Amount Sum
    
    let divCartItems = document.getElementsByClassName('cart-items');

    let countOfItemsInCart = divCartItems[0].childElementCount;

    for(let i=0; i<countOfItemsInCart; i++) {
        let divItem = divCartItems[0].children[i];
        let price = parseInt(divItem.children[1].innerText.split('₹')[1]);
        let quantity = divItem.children[2].children[0].value;
        payAmount += quantity * price; // updating
    }

    // updating Total Amount Sum (on Front-End)
    document.getElementById('pay-amount').innerText = payAmount;
}

/* PURCHASE */
document.getElementById('purchase').addEventListener('click', (e) => {
    e.preventDefault();

    let divCartItems = document.getElementsByClassName('cart-items');

    let countOfItemsInCart = divCartItems[0].childElementCount;

    if(countOfItemsInCart === 0) {
        alert('YOUR CART IS EMPTY! PLEASE CHOOSE FROM OUR SELECTION OF HAND-MADE GELATOS FIRST. ONLY THEN WILL YOU BE ALLOWED TO PROCEED TO CHECK-OUT.')
    }
    else {
        alert('*** THANK YOU FOR MAKING A DELICIOUS PURCHASE! DO BOTHER US AGAIN! (NO-PUN-INTENDED) ***');
        
        for(let i=0; i<countOfItemsInCart; i++) {
            divCartItems[0].children[0].remove();
        }

        /* resetting Total Amount Sum */
        payAmount = 0; // updating
        document.getElementById('pay-amount').innerText = 0; // on Front-End
    }
});
