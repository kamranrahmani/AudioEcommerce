const express = require('express');
const app = express();
const session = require('express-session');
const sessionStore = require('connect-session-sequelize')(session.Store);
const {auth, requiresAuth} = require('express-openid-connect');
const database = require('./models/index');
const routes = require('./routes/routes');
const path = require('path');

require('dotenv').config();


const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'))


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const store = new sessionStore({db : database.sequelize});

app.use(session({
    resave:false,
    secret: process.env.SESSION_SECRET,
    saveUninitialized:false,
    store:store,
}));

app.use(auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL : process.env.ISSUER_BASE_URL,
    baseURL : process.env.BASE_URL,
    clientID : process.env.CLIENT_ID,
    secret : process.env.SECRET
}));

app.use((req,res,next)=>{
    console.log(req.get('host'));
    if(!req.session.cart) {
        req.session.cart = {};
        req.session.save(()=>{
            next();
        })
    }
    next();
})


app.use(routes);

app.use((err,req,res,next)=>{
    res.send(err.message);
})


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})
