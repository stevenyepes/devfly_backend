require('../../app_api/models/db');
var async = require('async');
var User = require('../../app_api/models/users');
var Post = require('../../app_api/models/posts');
var userCtrl = require('../../app_api/models/authentication');
var userFixtures = require('../fixtures/users.json');
var notesFixtures = require('../fixtures/notes.json');

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
  async.each(userFixtures, function(data, next) {

  });
};
