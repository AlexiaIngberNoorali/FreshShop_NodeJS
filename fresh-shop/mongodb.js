const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'fresh-shop-api';

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    console.log('Connected to the database!');
    const db = client.db(databaseName);
    
    // db.collection('products').find({name : "Bananas" }).toArray((error, products) => {
    //     console.log(products)
    // })

   db.collection('users').find({name: {$eq: 'Andrew'}}).toArray((error, product) => {
    if(error){
          return console.log('Unable to fetch');
      }
      console.log(product);
    })
       

      
// function products () {
//     return new Promise(function(resolve, reject) {
//        database.collection("products").find({name:'apples'}).toArray( function(err, prod) {
//         if (err) {
//           // Reject the Promise with an error
//           return reject(err)
//         }
  
//         // Resolve (or fulfill) the promise with data
//         return resolve(prod)
//       })
//     })
//   }

// const productall = db.collection('products').find({});
// console.log(productall.cmd);

});

