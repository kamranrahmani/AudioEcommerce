const db = require('../models/index');


async function modifyCart (req,res,next) {

    const productId = req.body.targetProduct;
    const quantity = req.body.targetProductQuantity;
    if(!req.session.cart[productId]){
        try {
            if(quantity == 0) return res.json({message: 'no item added to cart'})
            let newCartProduct = await db.products.findOne({where:{id:productId}});
            let totalPrice = quantity * newCartProduct.price;
            let cartItem = {
                name : newCartProduct.name,
                price : newCartProduct.price,
                image : JSON.parse(newCartProduct.images)[0].url 
            }
            let addedProduct = {
                item : cartItem,
                price : totalPrice,
                quantity : quantity
            }
            req.session.cart[productId] = addedProduct;
            req.session.save(function(){
                return res.json({message: 'new item added to cart'});
            })
            return
        } catch (error) {
            next(error)
        }
    }else{
        if(quantity == 0){
            delete req.session.cart[productId];
            req.session.save(function(){
                return res.json({message: 'item removed from cart'});
            })
            return;
        }
        const existingProductObject = req.session.cart[productId];
        let totalPrice = existingProductObject.item.price * quantity;
        existingProductObject.price = totalPrice;
        existingProductObject.quantity = quantity;
        req.session.save(function(){
            return res.json({message: 'item updated in cart'})
        })
    }
}

function getCartData(req,res,next){
    const cart = req.session.cart;
    return res.json(cart);
}


function removeCartItems(req,res,next){
    req.session.cart = {};
    req.session.save(function (){
        res.json({message:'items deleted'});
        return
    })
    return
}


module.exports = {
    modifyCart,
    getCartData,
    removeCartItems
}


