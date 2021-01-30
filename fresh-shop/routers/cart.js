const Cart = require("../models/cart");
const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require("../config/auth.js")

router.get('/cart', (req,res) => {
       res.render('cart')
      });

router.post('/')     
module.exports = router;