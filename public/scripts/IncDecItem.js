const decrementItemBtn = document.getElementById('decrement-item');
const incrementItemBtn = document.getElementById('increment-item');
const itemQuantity = document.getElementById('item-quantity');
const addTocartBtn = document.getElementById('add-to-cart');

decrementItemBtn.addEventListener('click',decrementItem);
incrementItemBtn.addEventListener('click',incrementItem);
addTocartBtn.addEventListener('click',updateCart);


function incrementItem(){
    let quantityValue = itemQuantity.innerText;
    quantityValue++;
    itemQuantity.innerText = quantityValue;
}


function decrementItem(){
    let quantityValue = itemQuantity.innerText;
    if(quantityValue == 0){
        return
    }
    quantityValue--;
    itemQuantity.innerText = quantityValue;
}

async function updateCart(event){
    const productId = incrementItemBtn.dataset.productid;
    const quantity = itemQuantity.innerText;
    const data = {
        targetProduct : productId,
        targetProductQuantity : quantity
    }
    event.target.innerText = 'ADDED TO CART';
    setTimeout(()=>{
        event.target.innerText = 'ADD TO CART';
    },2000)

    try {
        const response = await fetch('/cart/modifycart',{
            method : 'POST',
            body : JSON.stringify(data),
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        if(!response.ok){
            alert('failed to add product to cart');
            return
        }
        

    } catch (error) {
      
    }
}



