const upload = require('../Middlewares/fileUpload').upload;
const bucket = require('../Middlewares/fileUpload').bucket;
const db = require('../models/index');
const {Op} = require('sequelize');
const uuid = require('uuid');


async function getProductForm(req,res,next){
    res.render('productform');
}

async function addProduct(req,res,next) {

    upload(req,res,async function(err){

        try {

            const imageFiles = req.files;
            let uploadedImages = [];
            const uploadTask = imageFiles.map(image => new Promise((resolve,reject)=>{
                let extArray = image.mimetype.split('/');
                let filename = Date.now() + '-' + uuid.v4() +'.'+extArray[extArray.length - 1];
                const blob = bucket.file(filename);
                const blobStream = blob.createWriteStream();
                let imageurl = {
                    url : `https://storage.googleapis.com/audio-image-storage/${blob.name}`
                }
                uploadedImages.push(imageurl);
                blobStream.on('finish',resolve);
                blobStream.end(image.buffer);
            }))
            
             Promise.all(uploadTask).then(async ()=>{
                const receivedProductData = req.body;
                const product = {
                name:receivedProductData.name,
                slug:receivedProductData.slug,
                category:receivedProductData.category,
                price:receivedProductData.price,
                isNew: receivedProductData.newitem,
                description: receivedProductData.description,
                features:receivedProductData.features,
                items:JSON.stringify(receivedProductData.items),
                images: JSON.stringify(uploadedImages)
            }
                const savedProduct = await db.products.create(product);
                return res.redirect('/');
            }).catch(err=>{
                console.log('product creation error ' + err);
                next(err);
            })

        } catch (error) {
            console.log('function error '+ error);
            next(new Error('an error happened while saving the product'));
        }
    })

}


async function getCategory(req,res,next){

    try {
        const category = req.params.category;
        const productCategory = await db.products.findAll({where:{category:category}});
        productCategory.forEach(product => {
            product.dataValues.images = JSON.parse(product.dataValues.images);
            product.dataValues.items = JSON.parse(product.dataValues.items);
        })
          
        res.locals.category = category;
        res.render('categories',{fetched:productCategory});
        return
    } catch (error) {
        next(error);
    }

}

async function specificProduct(req,res,next){
    try {

        const productId = req.params.id;
        const productById = await db.products.findOne({where:{id: productId}});   
        const [randomSuggestedProducts , metadata] = await db.sequelize.query(`SELECT * FROM products 
            where products.id != ${productId}
            ORDER BY RAND() LIMIT 3`); // fetches 3 random items for suggestion. makes sure the main product is not fetched again.

        productById.dataValues.images = JSON.parse(productById.dataValues.images);
        productById.dataValues.items = JSON.parse(productById.dataValues.items);
        randomSuggestedProducts.forEach(suggestion => {
            suggestion.images = JSON.parse(suggestion.images);
        })
        res.render('product', {product:productById, suggestions: randomSuggestedProducts});
        
    } catch (error) {
        next(error)
    }

}



module.exports = {
    addProduct,getProductForm
    ,getCategory,specificProduct
}
