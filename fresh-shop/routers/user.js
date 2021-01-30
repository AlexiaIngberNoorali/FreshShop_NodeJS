// All routes for the user to login / logout
const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
//Import the model that will be here instantiated in callback functions
// premier point : je sors 
// deuxieme point : de la ou je suis je vais dans 
// / dossier model

const User = require("../model/user.js");
// To access register form
router.get('/register', (req,res) => {
    res.render('register')
   });

// Access login form
router.get('/login', (req,res) => {
    res.render('login');
    
});

router.get('/logout', (req,res) => {
  req.logout();
  req.flash('success_msg','Now logged out');
  res.redirect('/user/login');
})


// Render shop page with products
// router.get('/shop', (req, res) => {
//   Product.find({}, (err, products) => {
//       res.render('shop', {
//           title : 'Shop',
//           productList : products
//       })  
//   });
   
// });

// User send data to register

router.post('/register',(req,res)=>{

  // stock in variable all keys defined in User Model 
  // keys can be accessed through req.body 
const {name, email, password, password2} = req.body;
let errors = [];
console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password);

// Error handling

//Check if all boxes are filled
if(!name || !email || !password || !password2) {
    errors.push({msg : "Please fill in all fields"})
};

// Check if password 1 is same as password 2

if(password !== password2) {
  errors.push({msg : "Sorry but your passwords dont match!"});
};

// Check if password is more than 6 characters
if(password.length < 6 ) {
  errors.push({msg : 'Your password should be atleast 6 characters!'})
};

//If [errors] contains errors (from the checking above)
//Print those error to tue user as well as the data he provided

if(errors.length > 0 ) {
  res.render('register', {
      errors : errors,
      name : name,
      email : email,
      password : password,
      password2 : password2
    })
  } else {
    // Check if the user already exists
    // if the [] is empty. Validation is successful
    // findOne : 
    //ARG1 : the property you are looking for
    //ARG2 : callback function(here using exec)
    
    User.findOne({email : email}).exec((err,user)=> {
        console.log(user);
        //if email user already exists 
        // does not work
        if(user) {
          errors.push({msg : 'Your email is already registered, try to login instead!'});
          //if user already exists : stay on the register page and display all object's keys
          res.render('register',{errors,name,email,password,password2}) ;
          //bcrypt password for safety
        } else {
          const newUser = new User({
            name : name,
            email : email,
            password : password})
          
          bcrypt.hash(newUser.password, 10, function(err, hash) {
              // Store hash in your password DB.
              if(err) {
                  throw err
              }
              //if no err, hash the password (here hash is a call of the function above)
              newUser.password = hash;
              // save the user to the db
              newUser.save()
              .then((value) => {
                  console.log(value);
                  req.flash('success_msg','You have now registered!');
                  res.redirect('/user/login');
              })
              .catch((value) => {
                  console.log(value);
              })
      
          });
          
          
          }


//closing callback from post register
          })};
          });






  
 
// user send data to login
// Check the doc in passport.js : useful and you ll understand it baby
router.post('/login',(req,res,next)=>{
  passport.authenticate('local',{
    successRedirect : '/dashboard',
    failureRedirect : '/user/login',
    failureFlash : true,
    })
    (req,res,next);
});


module.exports = router;