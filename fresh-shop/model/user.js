const mongoose = require('mongoose');


const UserSchema  = new mongoose.Schema({
name :{
      type  : String,
      required : true
  } ,
email :{
    type  : String,
    required : true
} ,
password :{
    type  : String,
    required : true
} ,
date :{
    type : Date,
    default : Date.now
} ,
cart : {
    type : Number,
    required : true
}
});

// Stock model in a variable so that all future user will have the same structure as the one defined in the Schema 

const User= mongoose.model('User',UserSchema);

module.exports = User;