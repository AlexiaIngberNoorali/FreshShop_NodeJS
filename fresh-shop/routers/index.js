// all routes for the different pages of the website

const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require("../config/auth.js")


router.get('/', (req, res) => {
    res.render('index')
});
router.get('/shop', (req, res) => {
  res.render('shop')
});
router.get('/dashboard',ensureAuthenticated,(req,res)=>{
  res.render('dashboard',{
    user: req.user
    });
  })
router.get('/about', (req,res) => {
  res.render('about')
});

router.get('/checkout', (req,res) => {
 res.render('checkout')
});

router.get('/register', (req,res) => {
 res.render('register')
});

router.get('/cart', (req,res) => {
  res.render('cart')
 });
 

// router.get('/login', (req,res) => {
//   res.render('login')
//  });


//works with simple button
router.post('/',(req, res) => {
 console.log(req.body);
 });



 module.exports = router;
















module.exports = router;
