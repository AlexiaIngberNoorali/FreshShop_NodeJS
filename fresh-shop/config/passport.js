const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require("../model/user");


    // usernameField : provide the email input that will be compared against the database
    // Instatiate new Object(new LocalStrategy) 
    // Callback function with three param(email, passwd, done)
    // LocalStrategy expects to find credentials in parameters named username and password.
   /*
PASSPORT IMPORTANT CONCETPS 

+       Passport uses term 'strategies' to authenticate requests. 
+       Strategies range from verifying a username and password : 
+       Strategy is a request to verify
+       After instatiating the strategy you establish the verify callback
+       The purpose of a verify callback is to find the user that possesses a set of credentials.
+       When Passport authenticates a request, it parses the credentials contained in the request.
+       It then invokes the verify callback with those credentials as arguments, in this case username and password. If the credentials are valid, 
+       The verify callback invokes done to supply Passport with the user that authenticated.
+       An additional info message can be supplied to indicate the reason for the failure.
+        This is useful for displaying a flash message prompting the user to try again.



   */


  module.exports = function(passport) {

    passport.use(
        //
        new LocalStrategy({usernameField : 'email'},(email,password,done)=> {
                //We use the User model to see if there is a match
                // findOne() : find the query email of the User Collection and see if it matches the input email
                User.findOne({email : email})
                // Once that operation findOne() is done run the promise code
                .then((user)=>{
                // If there are no users
                 if(!user) {

                     return done(null,false,{message : 'That email is not registered. Please register before trying to login'});
                 }
                 //if there is a user with an existing email check if its the same as the one in the db
                 //bcrypt.compare ()
                 // ARG1 : password provided by user 
                 // ARG2 : password of the user in the database
                 //ARG3 : callback function
                 bcrypt.compare(password,user.password,(err,isMatch)=>{
                     if(err) throw err;

                     if(isMatch) {
                        //null is a mandatory param present wheter it goes right or wrong
                         return done(null,user);
                     } else {
                         return done(null,false,{message : 'Your password is incorrect. Please try again'});
                     }
                 })
                })
                .catch((err)=> {console.log(err)})
        })
        
    )
// Keeping only the user id when session is open (data is stored in a cookie)
// Later one when other requests are made by the user, this specific idea will be used(equivalent to the token)
// The serializeUser is the one which determines which data in the user object is to be stored in the session  
// On choisit  quelle property on store pendant que la session est ouverte 


passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
//deserializeUser checks if the key{id} matches with the in memory array or database or any data resource to get the whole user object
// Quand il y a d'autre request on utilise cette property pour voir si elle fit any of the properties defined in the db
// That is why it is User(db).findById(property we provided)   
// Pour que ca nous retourne l'objet user final

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      }); 
}; 
// end of the function 'passport'




/*  SESSIONS - SERIALIZEUSER / DESERIALIZEUSER
In a typical web application, the credentials used to authenticate a user will only be transmitted during the login request. 
If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.

Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session. In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
In this example, only the user ID is serialized to the session, keeping the amount of data stored within the session small. When subsequent requests are received, this ID is used to find the user, which will be restored to req.user.

The serialization and deserialization logic is supplied by the application, allowing the application to choose an appropriate database and/or object mapper, without imposition by the authentication layer.*/

/*    ABOUT FLASH
+   The flash is a special area of the session used for storing messages. 
+   Messages are written to the flash and cleared after being displayed to the user. 
+   The flash is typically used in combination with redirects, 
+   ensuring that the message is available to the next page that is to be rendered.*/