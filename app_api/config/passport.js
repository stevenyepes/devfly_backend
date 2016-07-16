var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');


passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findOne({
    _id: id
  }, '-salt -hash', function(err, user) {
    cb(err, user);
  });
});

/* Configure passport local Strategy to validate users*/
passport.use(new LocalStrategy (
  function(username, password, done) {
    User.findOne({username: username}, function(err, user){
      if(err) {return done(err);}
      if(!user) {
        return done(null, false, {
          message: 'Incorrect username'
        });
      }
      if(!user.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password"
        });
      }
      return done(null, user);
    });

  }
));

/* Configure passport Google Strategy to validate users*/
// =========================================================================
// GOOGLE ==================================================================
// =========================================================================
passport.use(new GoogleStrategy({

    clientID        : process.env.GOOGLE_CLIENT_ID,
    clientSecret    : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL     : process.env.GOOGLE_CALLBACK_URL,

  },
  function(token, refreshToken, profile, done) {

      // make the code asynchronous
      // User.findOne won't fire until we have all our data back from Google
      process.nextTick(function() {

          // try to find the user based on their google id
          User.findOne({ 'google.id' : profile.id }, function(err, user) {
              if (err)
                  return done(err);

              if (user) {

                  // if a user is found, log them in
                  return done(null, user);
              } else {
                  // if the user isnt in our database, create a new user
                  var newUser          = new User();
                  // set all of the relevant information
                  newUser.google.id    = profile.id;
                  newUser.google.token = token;
                  newUser.name = profile.displayName;
                  newUser.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                  newUser.role = 'user';
                  // save the user
                  newUser.save(function(err) {
                      if (err)
                          throw err;
                      return done(null, newUser);
                  });
              }
          });
      });

}));
