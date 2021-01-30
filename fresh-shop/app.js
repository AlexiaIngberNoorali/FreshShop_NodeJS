// Central Set up of all packages
const path = require('path');
const express = require('express');
const router  = express.Router();
const session = require('express-session');
const Seed = require('./seed/seed-product')
const Product = require('./model/product');

const flash = require('connect-flash');
const passport = require('passport');
const port = process.env.PORT || 3000;
const app = express();
const mongoose = require('mongoose');
//passport config

require('./config/passport')(passport);



const expressEjsLayout = require('express-ejs-layouts');
const { db } = require('./model/user');

// Paths to other folders

//Path to public directory (dumb files)
const publicDirectoryPath = path.join(__dirname, '/public');
app.use(express.static(publicDirectoryPath));
// Path to views directory (ejs files)
const viewsPath = path.join(__dirname, './views');
app.set('views', viewsPath);

// Transform all data treated by express into json objects
app.use(express.json());

// Mongoose 
mongoose.set("useFindAndModify", false);
mongoose.connect('mongodb://127.0.0.1:27017/fresh-shop-api', {
    useNewUrlParser: true ,  
    useUnifiedTopology: true
}).then(() => {
    console.log('You are connected!');
}).catch((error) => {
    console.log(error, 'There s been a problem');
})

// Render shop page with products
app.get('/shop', (req, res) => {
    Product.find({}, (err, products) => {
        res.render('shop', {
            title : 'Shop',
            productList : products
        })  
    });
     
  });




//EJS : Initiate packages previously required
app.use(expressEjsLayout);
app.set('view engine', 'ejs');




/*
Body-Parser
It is responsible for parsing the incoming request bodies in a middleware before you handle it
*/
app.use(express.urlencoded({ extended: true })); 



//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
   }));

app.use(passport.initialize());
app.use(passport.session());
   app.use(flash());
   //don't understand the bit of code below
   app.use((req,res,next)=> {


       //res.locals 
    /* 
    +    The res.locals property is an object that contains response local variables 
    +    Those var are scoped to the request and because of this,
    +    It is only available to the view(s) rendered during that request/response cycle (if any)
    
    */
      //req.flash()
    /*
    +   Set a flash message by passing the key, followed by the value, to req.flash()
    */ 

    // what i send through flash is what the user sees on the page?
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error  = req.flash('error');
   next();
   });

//Access all routes in routers/index.js

app.use('/user',require('./routers/user'));
// app.use('/cart',require('./routers/cart'));
app.use('/',require('./routers/index'));





// Fetch products from the db

app.listen(port, () => {
    console.log('Server is up and running! ' + port);

});
 
//  module.exports = router;