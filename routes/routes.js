const router = require('express').Router();
const productController = require('../controllers/products');
const cartController = require('../controllers/cart');
const checkoutRoutes = require('../controllers/checkout');


router.get('/', (req,res,next) => res.render('home'));

//********************** product routes ************************/

router.get('/products/addProduct', productController.getProductForm);

router.post('/products/addProduct', productController.addProduct);

router.get('/products/:category', productController.getCategory);

router.get('/product/:id',productController.specificProduct);

//*********************** cart routes *************************/

router.post('/cart/modifycart',cartController.modifyCart);

router.get('/cart/getcart', cartController.getCartData);

router.delete('/cart/deletecart', cartController.removeCartItems);

//****************** checkout and order routes ********************/

router.get('/checkout/', checkoutRoutes.getCheckOut);

router.post('/checkout/pay', checkoutRoutes.payment);

router.get('/checkout/success', checkoutRoutes.getSuccessPayment);

router.get('/checkout/cancel', checkoutRoutes.getCancelPayment);



module.exports = router

