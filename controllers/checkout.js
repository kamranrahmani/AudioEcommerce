const stripe = require('stripe')('sk_test_51M9GZZG6XwsLCl2Dh0BgBnIsnUhd7TR0X1kKDRsTKDkvN929SR2XQUenQqh5IfV3Xix2IbGcQxFVx3QtoVvau64900P90BMpfT');
const cryptoRandomString = import('crypto-random-string');
const orders = require('../models/index').orders;


function getCheckOut(req,res,next){
    res.locals.orderStatus = req.session.orderStatus;
    req.session.orderStatus = {
        paymentSuccess : false,
        orderid : ''
    }
    const cart = JSON.parse(JSON.stringify(req.session.cart));
    let totalPrice = 0;
    for(const key in cart){
        totalPrice += parseInt(cart[key].price); 
    }
    let PST = parseInt(totalPrice * 0.09) 
    let GST = parseInt(totalPrice * 0.05) 
    let shipping = 20;
    let grandTotal = parseInt(totalPrice + PST + GST + shipping) 
    let priceAndTaxAndShip = {
        total : totalPrice,
        GST: GST,
        PST: PST,
        shipping : shipping,
        grandTotal :grandTotal
    }
    req.session.totalToPay =  grandTotal;
    req.session.save(function(){
       return res.render('checkout',{summary: cart , expense:priceAndTaxAndShip});
    })
}


async function payment(req,res,next){
    const host = req.get('host');
    const customer_info = req.body;
    req.session.customer_info = customer_info;
    req.session.save(function(){
        return
    })

    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {currency: 'cad', product_data: {name : 'audio instruments'} ,unit_amount: parseInt(req.session.totalToPay)* 100},
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://${host}/checkout/success/`,
        cancel_url: `http://${host}/checkout/cancel/`,
      });
      res.redirect(303, session.url);

}


async function getSuccessPayment(req,res,next){

    const stringGen = await cryptoRandomString;
    let orderId = await stringGen.cryptoRandomStringAsync({length: 10, type: 'alphanumeric'});
    let existingOrder = await orders.findOne({where:{orderid: orderId}});
    while(existingOrder){
        orderId = await stringGen.cryptoRandomStringAsync({length: 10, type: 'alphanumeric'});
        existingOrder = await orders.findOne({where:{orderid: orderId}});
    }
    let order = {
        orderid : orderId,
        useremail: req.session.customer_info.email,
        userinfo :JSON.stringify(req.session.customer_info),
        items : JSON.stringify(req.session.cart),
        date : new Date().toLocaleString()
    }

    await orders.create(order);
    req.session.cart = {};
    delete req.session.totalToPay;
    delete req.session.customer_info
    req.session.orderStatus = {
        paymentSuccess : true,
        orderid : orderId
    }
    req.session.save(function(){
        return res.redirect('/checkout/');
    })
    return
}


function getCancelPayment(req,res,next){

}


module.exports = {
    getCheckOut,payment,
    getSuccessPayment,
    getCancelPayment
}


