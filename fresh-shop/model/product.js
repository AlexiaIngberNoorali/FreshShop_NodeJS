const mongoose = require('mongoose');
const { stringify } = require('querystring');

// Uniquement pour creer les produits dans la db et puis a supprimer sinon it will add products everytime you restart the server 
// Product.insertMany(Seed, function (err) {
//     if(err){
//         console.log(err)
//     }
//   });


const schema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    price : { 
        type : Number,
        required : true 
    }
});

module.exports = mongoose.model('Product', schema);