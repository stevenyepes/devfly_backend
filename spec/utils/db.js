require('dotenv').load();
require('../../app_api/models/db');
var async = require('async');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');
var usersFixtures = require('../fixtures/users.json');
var postsFixtures = require('../fixtures/posts.json');



// empty the database
exports.reset = function(callback) {
  async.parallel([
    function emptyNotesCollection(cb) {
      Post.remove({}, cb);
    },
    function emptyUsersCollection(cb) {
      User.remove({}, cb);
    }], callback);
};

// populate the database with fixtures
exports.populate = function(callback) {
  var token;
  async.each(usersFixtures, function(data, next) {
    //console.log(data);
    var user = new User({
      username: data.username,
      email: data.email,
      name: data.name,
      role: data.role
    });
    user.setPassword(data.password);
    user.save(function(err){
      if(err){return callback(err);}
      async.each(postsFixtures,function (data, next) {
        //console.log(data);
        var post = new Post({
          title: data.title,
          keywords: data.keywords,
          content: data.content,
          category: data.category,
          author: "admin"
        });
        post.save(function (err) {
          if(err){
            callback(err);
          }
          callback();
        });
        next();
      });
    });
    next();
  });
};

exports.setupDatabase = function (callback) {
  exports.reset(function (err) {
    if(err){return callback(err);}

    exports.populate(callback);
  });
};
