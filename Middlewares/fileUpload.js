require('dotenv').config()
const multer = require('multer');
const {Storage} = require('@google-cloud/storage');

const storage = new Storage({projectId: process.env.PROJECT_ID, credentials:{client_email: process.env.CLIENT_EMAIL, private_key: process.env.PRIVATE_KEY.split(String.raw`\n`).join('\n')}});

const bucket = storage.bucket(process.env.BUCKET_NAME);


const multerConfig = multer({

    storage:multer.memoryStorage(),
    
    fileFilter: (req,file,cb) =>{
        if(file.mimetype.startsWith('image')){
            cb(null,true)
        }else{
            cb(new Error('invalid file type. only images are allowed'));
        }
    }
})

const upload = multerConfig.array('images',4);

module.exports = {
    upload, bucket
}
