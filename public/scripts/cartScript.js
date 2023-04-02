const cartItemsContainer = document.getElementById('cart-items-container');
const totalItems = document.getElementById('cart-items-number');
const removeCartItemsBtn = document.getElementById('cart-remove-all');
const cartElement = document.getElementById('cart-element');
const cartLogo = document.getElementById('cart-logo');
const backDrop = document.getElementById('backdrop');

removeCartItemsBtn.addEventListener('click',removeAllItems);

cartLogo.addEventListener('click',(event) => {
    if(cartElement.classList.contains('hidden')){
        backDrop.classList.remove('hidden');
        cartElement.classList.remove('hidden');
        renderCart();
        return
    }else{
        cartElement.classList.add('hidden');
        backDrop.classList.add('hidden');
    }
});

backDrop.addEventListener('click',backDropToggler)





async function renderCart(){

   
        const response = await fetch('/cart/getcart');
        if(!response.ok){
            alert('failed to show cart');
            return

        }else{
            const cartData = await response.json();
            if(Object.keys(cartData).length == 0){
                const message = document.createElement('p');
                message.classList.add('text-center');
                message.textContent = 'No items in cart!';
                cartItemsContainer.innerHTML = '';
                cartItemsContainer.appendChild(message);
                totalItems.textContent = `CART (0)`
                return
            }else{
                let totalNumberOfItems = 0;
                let cartTotalPrice = 0;
                cartItemsContainer.innerHTML = '';
               for(const key in cartData){
                const itemImage = cartData[key].item.image;
                let cartItemTemplate = `<div class="flex flex-row justify-between items-center">
                <div class="flex flex-row space-x-2 items-center ">
                    <img src="${itemImage}" alt="" class="w-16 h-16">
                    <div>
                        <h2 class="text-md font-bold">${cartData[key].item.name}</h2>
                        <p class="text-gray-700/50 text-sm">$${cartData[key].price}</p>
                    </div>
                </div>
                <div class="flex flex-row space-x-4 px-4 py-1 items-center bg-itemBg">
                    <button class="cartbtn text-gray-700/50 hover:text-darkPink" data-productid="${key}" data-type ="dec">-</button>
                    <p id="item-${key}-quantity" class="text-sm">${cartData[key].quantity}</p>
                    <button class="cartbtn text-gray-700/50 hover:text-darkPink" data-productid="${key}" data-type="inc" >+</button>
                </div>
            </div>`
                totalNumberOfItems += parseInt(cartData[key].quantity);
                cartTotalPrice += parseInt(cartData[key].price); 
                cartItemsContainer.innerHTML += cartItemTemplate;
               }
               
               let totalPriceHtml = ` <div class="flex flex-row justify-between items-center">
                    <p class="text-gray-700/50 text-sm px-4">TOTAL</p>
                    <p id="cart-total-price" class="font-bold text-md">$${cartTotalPrice}</p>
                </div>`
                cartItemsContainer.innerHTML += totalPriceHtml;
                totalItems.textContent = `CART (${totalNumberOfItems})`;
                [...document.getElementsByClassName('cartbtn')].forEach(btn => {btn.addEventListener('click',modifyCart)});
                return;
            }
        }
   
}

async function removeAllItems(){
    try {
        const response = await fetch('/cart/deletecart',{
            method : 'DELETE'
        })
        if(response.ok){
            renderCart();
            return
        }else{
            alert('could not remove items');
            return
        }
    } catch (error) {
        alert('please check your nerwork connection or try later');
    }
}


async function modifyCart(event){
    const productId = event.target.dataset.productid;
    const quantityField = document.getElementById(`item-${productId}-quantity`);
    const actionType = event.target.dataset.type;
    let quantity = parseInt(quantityField.textContent);
    if(actionType == 'inc') quantity++;
    else{quantity--};
    let modifiedProduct = {
        targetProduct : productId,
        targetProductQuantity : quantity
    }

    try {
        const response = await fetch('/cart/modifycart',{
            method : 'POST',
            body : JSON.stringify(modifiedProduct),
            headers : {
                'Content-Type' : 'application/json'
            }
            
        })
        if(!response.ok){
            alert('updating cart had problem');
            return
        }
        else{
            renderCart();
        }

    } catch (error) {
        alert(error.message)
    }
}


function backDropToggler(){
    backDrop.classList.add('hidden');
    cartElement.classList.add('hidden');
}



