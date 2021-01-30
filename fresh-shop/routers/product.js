// const router  = express.Router();
// const express = require('express');
// const Seed = require('./seed/seed-product')
// const Product = require('./model/product');

// router.get('/shop', (req, res) => {
//     Product.find({}, (err, products) => {
//         res.render('shop', {
//             productList : products
//         })
//     });
   
// });

// module.exports = router;




/* product list contains two elements : 
+       title
+       price

what do we want : 

We want forEach to loop to each row of the db and display the product property
So each row should be an array and then 
There should be another loop to display the content of those array 

First step : transform the product(object) into an array 
Since it is not possible to have a all made method to transform things into an array
i can create an empty array and push inside of it 

*/
// app.get('/shop', (req, res) => {
//     Product.find({}, (err, products) => {
//         res.render('shop', {
//             productList : products
//         })
//     });
   
// });


















