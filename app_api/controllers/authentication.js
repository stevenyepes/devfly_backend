var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* Register user POST /register */
module.exports.register = function(req, res) {
  if(!req.body.username || !req.body.name || !req.body.email || !req.body.password) {
      sendJSONresponse(res, 400, {
        "message": "All fields required"
      });
      return;
    }
    var userRole = 'user';
    if(req.body.role) {
      userRole = req.body.role;
    }

    var user = new User({role:userRole});
    user.username = req.body.username;
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save(function(err) {
      var token;
      if (err) {
        sendJSONresponse(res, 404, err);
      } else {
        token = user.generateJwt();
        sendJSONresponse(res, 200, {
          "token" : token
        });
      }
    });
};

/* Login users POST /login */
module.exports.login = function(req, res) {
  if(!req.body.username || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  passport.authenticate('local', function(err, user, info){
    var token;

    if (err) {
      sendJSONresponse(res, 404, err);
      return;
    }

    if(user){
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token" : token
      });
    } else {
      sendJSONresponse(res, 401, info);
    }
  })(req, res);

};
